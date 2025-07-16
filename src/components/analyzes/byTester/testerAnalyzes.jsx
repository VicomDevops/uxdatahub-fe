import React from 'react';
import { connect } from 'react-redux';
import { Col, Row, Label, Button, Input, Progress } from "reactstrap"
import Eye from '../../../assets/eye.svg'
import Filter from '../../../assets/filter.svg'
import Edit from '../../../assets/edit.svg'
import axios from "axios";
import httpServices from "../../../services/httpServices";
import { URL_API } from "../../../config.json";
import { Player } from 'video-react';
import scenarioServices from '../../../services/scenarioServices'
import analyseServices from '../../../services/analyzeServices'
import CommentaireForm from '../commentaire'
import Modals from '../../common/modals/modal'
import LineChart from '../../common/charts/lineChart2';
import MaterialTable from "material-table";
import Landing from '../../../assets/landing.png'
import ReactTooltip from 'react-tooltip';
import RecapForm from '../byStep/recap'
import { toast } from 'react-toastify';
import Favorite from '../../common/header/favorite';
import Answers from '../byStep/answers';
import SkeletonAnalyse from "../byStep/skeletonAnalyse";
import NoDataSelected from '../../common/NoDataSelected';


class TesterAnalyzes extends React.Component {
    state = {
        btn: 'all',
        btn2: 'moyenne',
        scenarios: [],
        scenario: {},
        tester: {},
        testers: [],
        analyseObj: [],
        play: false,
        header: [],
        dataAv: {
            labels: [],
            datasets: [
                {
                    data: [],
                },
            ],
        },
        dataDev: {
            labels: [],
            datasets: [
                {
                    data: [],
                },
            ],
        },
        analyse: [],
        analyses: {},
        video: '',
        videoEtap: '',
        comment: '',
        duration: '',
        myRef: null,
        chartRef: null,
        chartReady: false,
        chartJs: null,
        cliqueEtape: null,
        selectValue: null,
        loading: true,
        skeleton: false,
        dataMoyChart: {
            labels: [],
            datasets: [
                {
                    data: [],
                },
            ],
        },
        dataeCartChart: {
            labels: [],
            datasets: [
                {
                    data: [],
                },
            ],
        },
        tabEtapes: [],
        selectedRow: -1,
        footerDisplay: false,
    }

    componentDidMount() {
        this.myRef = React.createRef();
        this.myRefVideo = React.createRef();
        let scenariosTab = []
        this.props.scenario?.scenarios.map((scenario) =>
            (scenario.progress !== 0 && scenario.progress !== null && scenario.progress !== undefined) &&
            scenariosTab.push(scenario)
        )
        this.setState({ scenarios: scenariosTab })
    }

    renderTableClickable = () => {
        const columns = [
            { title: "Etape", field: 'step', width: "15%" },
            { title: "Score", field: 'score', width: "15%", render: rowData => <div style={{ color: rowData.score >= 0 ? 'green' : 'red' }}>{rowData.score}</div> },
            { title: "Intensité", field: '', width: "20%", render: rowData => rowData.magnitude >= .5 ? <Progress className='progress_bar' color="info" value={rowData.magnitude * 100}>{rowData.magnitude * 100}%</Progress> : <Progress className='progress_bar' color="warning" value={rowData.magnitude * 100}>{rowData.magnitude * 100}%</Progress> },
            { title: "Réponse", field: 'answer', width: "20%", render: rowData => <div style={{ height: "2rem", overflow: "auto", display: 'flex', alignItems: 'center' }} > <span>{rowData.answer}</span></div> },
            { title: "Durée (sec)", field: 'duration', width: "15%" },
        ]
        const actions = [
            {
                icon: () => <img style={{ width: "14px", margin: '0 0 0 1em' }} src={Edit} alt="" />,
                tooltip: 'Commentaire',
                onClick: (event, rowData) => this.setState({ idAnswer: rowData }, () => this.toggle()),
            },
        ]

        return (
            <MaterialTable
                style={{
                    backgroundColor: "white", border: "none ", boxShadow: "none", borderCollapse: "separate", borderSpacing: "0 15px", width: '90%'
                }}
                title={<Label style={{ fontSize: "1.4em", color: "#000", fontWeight: "500", fontFamily: 'sans-serif', cursor: "help" }}
                    data-tip='Détail des différents scores des testeurs pour chaque étape'
                    data-background-color="#F3FBF7"
                    data-text-color='#000'
                    data-multiline={true}
                    data-type='info'>
                    Analyse par testeur
                </Label>}
                columns={columns}
                data={
                    this.state.analyse
                }
                actions={actions}
                onRowClick={(event, rowData) => this.onRowClick(rowData)}
                localization={{
                    body: {
                        emptyDataSourceMessage: 'Aucune donnée à afficher',
                    },
                    pagination: {
                        labelDisplayedRows: '{from}-{to} de {count}',
                        labelRowsSelect: 'lignes',
                        labelRowsPerPage: 'lignes par page:',
                        firstAriaLabel: 'Première page',
                        firstTooltip: 'Première page',
                        previousAriaLabel: 'Page précédente',
                        previousTooltip: 'Page précédente',
                        nextAriaLabel: 'Page suivante',
                        nextTooltip: 'Page suivante',
                        lastAriaLabel: 'Dernière page',
                        lastTooltip: 'Dernière page'
                    },
                }}

                options={{
                    pageSize: 5,
                    pageSizeOptions: [5, 10, 15],
                    actionsColumnIndex: -1,
                    cellStyle: {
                        lineHeight: "1 ",
                        textAlign: "start",
                    },
                    headerStyle: {
                        lineHeight: "1 ",
                        textAlign: "start",
                        backgroundColor: "#f3fbf7",
                    },
                    searchFieldStyle: {
                        color: "#00a359",
                        MuiInputUnderline: "none",
                    },
                    //tableLayout: "fixed"
                    rowStyle: rowData => ({
                        backgroundColor: (this.state.selectedRow === rowData.tableData.id) ? '#ddd' : 'inherit',

                    })
                }}

            />
        )
    }
    onRowClick = (data) => {
        this.setState({ selectedRow: data.tableData.id, footerDisplay: true });
        this.setState({ analyse: data, videoEtap: data.videoEtap })
        setTimeout(() => {
            this.stepVideo()
        }, 200);
    }
    stepVideo = (evt) => {
        const targetRef = this.myRefVideo.current;
        if (targetRef instanceof HTMLElement) {
            targetRef.scrollIntoView({ behavior: 'smooth' });
        }
    }
    toggle = () => {
        this.setState({ show: !this.state.show })

    }
    onSubmit = () => {
        let content = this.state.comment
        scenarioServices.addComment(this.state.idAnswer.id, { content: content }).then(res => {
            toast.success('Votre commentaire a été enregistré')
            this.toggle()
        })
    }
    toggle2 = () => {
        this.setState({ open: !this.state.open })
    }

    onChangeComment = (e) => {
        this.setState({ comment: e.target.value })
    }
    renderModalCommentaire() {
        const { comment } = this.state
        return (
            <Modals
                // modalSize="modal-lg"
                show={this.state.show}
                toggleShow={this.toggle}
                header='Ajouter un commentaire'
            >
                <CommentaireForm
                    handleSubmit={this.onSubmit}
                    onchange={this.onChangeComment}
                    comment={comment}
                    error={this.state.error}
                />

            </Modals>
        )
    }
    renderModalRecap() {
        const { dataAv, header } = this.state
        let dataAvSorted = dataAv?.datasets && dataAv?.datasets[0]?.data?.sort((a, b) => a - b)
        let labels = []
        return (
            <Modals
                // modalSize="modal-lg"
                show={this.state.open}
                toggleShow={this.toggle2}
                header='Résumé'
            >
                <RecapForm
                    data={header}
                    dataAv={dataAvSorted}
                    labels={labels}
                />
            </Modals>
        )
    }
    filter = (e) => {
        this.setState({ ...this.state, btn: e })
    }
    filter2 = (e) => {
        this.setState({ ...this.state, btn2: e })
    }
    onChange = (e) => {
        let analyse = []
        if (isNaN(e)) {
            this.setState({
                tester: this.state.testers[e.target.value],
                video: this.state.testers[e.target.value].video
            }, () => analyseServices.getAnalysesByTester(this.state.tester.id, this.state.scenario.id).then(res => {
                    if(res.header.code !== 200){
                        toast.error(res.header.message)
                    }else{
                        res.response.answers.map(analyses => {
                            return {
                                id: analyses.id,
                                score: analyses.score,
                                duration: analyses.duration,
                                magnitude: analyses.magnitude,
                                videoText: analyses.videoText,
                                answer: analyses.answer,
                                videoEtap: analyses.video,
                                comment: analyses.comment,
                                step: `étape ${analyses.step.number}`
                            }
                        })
                        this.setState({ analyse: analyse, analyses: analyse[0], score: res.response.AvgScore, duration: res.response.AvgDuration, })
                    }
            }))
        }
        else {
            this.setState({
                tester: this.state.testers[e - 1],
                video: this.state.testers[e - 1].video
            }, () => analyseServices.getAnalysesByTester(this.state.tester.id, this.state.scenario.id).then(res => {
                    if(res.header.code !== 200){
                        toast.error(res.header.message)
                    }else{
                        res.response.answers.forEach(analyses => {
                            analyse = [...analyse, {
                                id: analyses.id,
                                score: analyses.score,
                                duration: analyses.duration,
                                magnitude: analyses.magnitude,
                                videoText: analyses.videoText,
                                answer: analyses.answer,
                                videoEtap: analyses.video,
                                comment: analyses.comment,
                                step: `étape ${analyses.step.number}`
                            }]
                        })
                        this.setState({ analyse: analyse, analyses: analyse[0], score: res.response.AvgScore, duration: res.response.AvgDuration, })
                    }
            }))
        }
        this.setState({ loading: false })
    }
    onChangeScenario = (e) => {
        this.setState({ loading: true, skeleton: true })
        axios
            .get(URL_API + `/api/scenario/details`, {
                headers: httpServices.getAuthorization(),
                params : { id:this.state.scenarios[e.target.value].id }
            })
            .then((response) => {
                this.setState({ header: response.data.response, loading: false, skeleton: false })

            })
            .catch((err) => {
                console.log(err);
            });
        let data1 = {
            labels: [],
            datasets: [
                {

                    data: [],
                },
            ],
        }
        let dataTest = []
        let data2 = {
            labels: [],
            datasets: [
                {

                    data: [],
                },
            ],
        }
        let analyse = []
        let testers = []
        this.setState({
            scenario: this.state.scenarios[e.target.value], dataAv: {
                labels: [],
                datasets: [
                    {
                        data: [],
                    },
                ],
            },
            dataDev: {
                labels: [],
                datasets: [
                    {
                        data: [],
                    },
                ],
            }, analyseObj: [],
        }, () => {
            analyseServices.getTester(this.state.scenario?.id).then(res => {
                testers = res?.response.map((obj) => {
                    return {
                        id: obj.clientTester?.id,
                        tester: `${obj.clientTester.name.charAt(0).toUpperCase()+obj.clientTester.name.slice(1)} ${obj.clientTester.lastname.charAt(0).toUpperCase()}`,
                        video: obj.video
                    }
                })
                this.setState({ testers: testers, video: testers[0]?.video, tester: testers[0] }, () =>
                    analyseServices.getAnalysesByTester(this.state.testers[0]?.id, this.state.scenario.id).then(res => {
                        if(res.header.code !== 200){
                            toast.error(res.header.message)
                        }else{
                            res.response.answers.map(analyses => (
                                analyse = [...analyse, {
                                    id: analyses.id,
                                    score: analyses.score,
                                    duration: analyses.duration,
                                    magnitude: analyses.magnitude,
                                    videoText: analyses.videoText,
                                    answer: analyses.answer,
                                    videoEtap: analyses.video,
                                    comment: analyses.comment,
                                    step: `étape ${analyses.step.number}`
                                }]
                            ))
                            this.setState({ analyse: analyse, analyses: analyse[0], score: res.response.AvgScore,
                                duration: res.response.AvgDuration, })
                        }
                    }))
            })
            analyseServices.getJourneyMapTester(this.state.scenario?.id).then(res => {
                let scoreTab = []
                let zeroTab = []
                let etapeTab = []
                let ecartTab = []
                let tabEtapes = []
                let tabMax = [0.74, 0.85, 0.83, 0.93, 0.91]
                let tabMin = [-0.9, -0.7, -0.4, -0.6, -0.5]
                if(res.header.code !== 200){
                    toast.error(res.header.message)
                }else{
                    res?.response.forEach((obj, idx) => {
                        if (obj?.average !== null) {
                            scoreTab.push(obj?.average === null ? 0 : parseFloat(obj?.average))
                            ecartTab.push(obj?.deviation === null ? 0 : parseFloat(obj?.deviation))
                            etapeTab.push(obj?.labels.toUpperCase())
                        }
                        // ajouter a chaque fois le obj dans le tableau tabEtapes
                        tabEtapes.push(obj)
                        // this.state.dataAv?.datasets[0]?.data?.push(obj?.average)
                        this.state.dataDev?.datasets[0]?.data?.push(obj?.deviation)
                        //console.log(this.state.dataAv?.datasets[0]?.data, 'ite');
                        data1.labels[idx] = obj.labels
                        dataTest[idx] = obj.average
                        data2 = {
                            labels: [...data2.labels, obj.labels],
                            datasets: [
                                {
                                    data: this.state.dataDev.datasets[0].data,
                                }
                            ]
                        }
                        this.state.analyseObj.push(obj)

                    })
                }
                for (let i = 0; i < scoreTab.length; i++) {
                    zeroTab.push(0)
                }
                this.setState({ tabEtapes: tabEtapes })
                this.setState({
                    dataMoyChart: {
                        labels: etapeTab,
                        datasets: [
                            {
                                label: 'Moyenne',
                                data: scoreTab,
                                pointBackgroundColor:
                                    scoreTab.map((value, idx) => {
                                        if (value === 0) {
                                            return 'black'
                                        } else if (value > 0) {
                                            return 'green'
                                        }
                                        else {
                                            return 'red'
                                        }
                                    }),
                                pointBorderColor:
                                    scoreTab.map((value, idx) => {
                                        if (value === 0) {
                                            return 'black'
                                        } else if (value > 0) {
                                            return 'green'
                                        }
                                        else {
                                            return 'red'
                                        }
                                    }),
                            },
                            {
                                label: 'Valeur maximales',
                                data: tabMax,
                                borderColor: 'rgba(0, 163, 89, 1)',
                                backgroundColor: 'rgba(0, 163, 89, 1)',
                                datalabels: {
                                    display: false, // Masquer les valeurs pour la courbe "max"
                                },
                                pointRadius: 2.5, // Masquer les points pour la courbe "moyenne"
                                pointHoverRadius: 2.5,
                                borderDash: [4, 7],
                                pointBorderColor: 'green',
                                borderWidth: .5,

                            },
                            {
                                label: 'Valeur minimales',
                                data: tabMin,
                                borderColor: 'rgba(255, 0, 0, 1)',
                                backgroundColor: 'rgba(255, 0, 0, 1)',
                                datalabels: {
                                    display: false, // Masquer les valeurs pour la courbe "min"
                                },
                                pointRadius: 2.5, // Masquer les points pour la courbe "moyenne"
                                pointHoverRadius: 2.5,
                                borderDash: [4, 7], // Pour les pointillés
                                pointBorderColor: 'red',
                                borderWidth: .5,
                            },
                        ]
                    }
                })
                this.setState({
                    dataEcartChart: {
                        labels: etapeTab,
                        datasets: [
                            {
                                label: 'Ecart type',
                                data: ecartTab,
                            },
                            {
                                label: 'Valeur maximales',
                                data: tabMax,
                                borderColor: 'rgba(0, 163, 89, 0.2)',
                                backgroundColor: 'rgba(0, 163, 89, 0.2)',
                                datalabels: {
                                    display: false, // Masquer les valeurs pour la courbe "max"
                                },
                                borderDash: [5, 5],
                                pointRadius: 3,
                                pointHoverRadius: 3,

                            },
                            {
                                label: 'Valeur minimales',
                                data: tabMin,
                                borderColor: 'rgba(255, 0, 0, 0.2)',
                                backgroundColor: 'rgba(255, 0, 0, 0.2)',
                                datalabels: {
                                    display: false, // Masquer les valeurs pour la courbe "min"
                                },
                                borderDash: [5, 5], // Pour les pointillés
                                pointRadius: 3,
                                pointHoverRadius: 3,
                            },
                        ]
                    }
                })

                data1 = {
                    ...data1,
                    datasets: [{
                        data: dataTest,
                    },
                    ]
                }
                this.setState({
                    dataAv: data1, dataDev: data2
                })

            })
        })
    }

    stepView = (evt) => {
        const targetRef = this.myRef.current;
        if (targetRef instanceof HTMLElement) {
            targetRef.scrollIntoView({ behavior: 'smooth' });
        }
    }
    setChartRef = (ref) => {
        this.setState({ chartJs: ref })
    }
    render() {
        const { btn2, dataMoyChart, dataEcartChart, dataAv, skeleton, header, duration, cliqueEtape, score } = this.state
    
        const domain = 'http://uxdatahub.com//2m'
        const videoEtapUri = this.state.videoEtap?.split("2m")
        const videoEtapUrl = videoEtapUri && domain.concat(videoEtapUri[1])
        let dataAvSorted = dataAv?.datasets && dataAv?.datasets[0]?.data?.sort((a, b) => a - b)
        const options2 = {
            responsive: true,
            type: 'line',
            plugins: {
                datalabels: {
                    display: true,
                    align: 'end',
                    anchor: 'end',
                    color: function (context) {
                        var index = context.dataIndex;
                        var value = context.dataset.data[index];
                        return value < 0 ? 'red' :  // draw negative values in red
                            value === 0 ? 'black' :  // else, default color
                                'green';            // else, draw positive values in green
                    },
                    font: {
                        weight: 'bold',
                        size: 12,
                    },
                },
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false,
                    position: 'nearest',
                },
            },
            scales: {
                x: {
                    type: 'category',
                    grid: {
                        display: true,
                        color: "rgba(0, 0, 0, 0.1)", // Couleur de la ligne de grille pour l'axe des abscisses
                        lineWidth: 1, // Épaisseur de la ligne de grille pour l'axe des abscisses
                    },
                },
                y: {
                    ticks: {
                        color: function (context) {
                            return context.tick?.value === 0 ? 'black' : context.tick?.value > 0 ? "green" : 'red';
                        },
                    },
                    grid: {
                        display: true,
                        color: (context) => {
                            if (context.tick?.value === 0) {
                                return "black"; // La ligne du zéro sera noire
                            } else {
                                return "rgba(0, 0, 0, 0.1)"; // Les autres lignes seront grises
                            }
                        },// Couleur de la ligne de grille pour l'axe des abscisses
                        //  les lignes de la grille sont en pointillé
                        borderDash: [2, 2],
                    },
                    suggestedMin: -0.5,
                    suggestedMax: 0.5,
                    type: 'linear',
                }
            },
            backgroundColor:
                dataAvSorted?.map((value, idx) => {
                    return value < 0 ? 'red' : '#00a359'
                }
                ),
            pointBorderColor:
                dataAvSorted?.map((value, idx) => {
                    return value < 0 ? 'red' : '#00a359'
                }
                ),
            borderColor: 'grey',
            cubicInterpolationMode: 'monotone',
            pointRadius: 2.8,
            pointHoverRadius: 7,
            fill: false,
            onClick: (event, elements) => {
                if (elements.length > 0) {
                    let etape = elements[0].index + 1
                    this.setState({ cliqueEtape: etape }, () => { this.onChange(etape); });
                    this.stepView();
                }
            }
        };


        return (
            <div className='analyze_form'>
                <Favorite />
                <div className='analyse-title-section'>
                    <span className="analyse-title">Analyse sémantique</span>
                </div>
                <div className='header-analyse'>
                    <div className="sub-header-title-section">
                        <span className="sub-header-title">Sélectionner un scénario:</span>
                    </div>
                    <div>
                        <Input type="select" name="select" className='btn_filter_select_scena-header' id="exampleSelect" onChange={this.onChangeScenario}>
                            <option selected disabled>Sélectionner un scénario</option>
                            {this.state.scenarios?.map((scen, idx) => {
                                return <option key={idx} value={idx} >{scen.title}</option>
                            })
                            }
                        </Input>
                    </div>
                    <div className='anaylyse_header-etapes'>
                        <div className='anaylyse-etape'>
                            <Label className="header_label">Etapes</Label>
                            {

                                    header?.steps ?
                                        <span className='header_span'>{header?.steps} </span>
                                        :
                                        ""
                            }
                        </div>
                        <div className='anaylyse-etape'>
                            <Label className="header_label">Testeurs</Label>
                            {

                                    header?.testers ?
                                        <span className='header_span'>{`${header?.testersDone}/${header?.testers}`}</span>
                                        :
                                        ""
                            }
                        </div>
                        <div className='anaylyse-etape'>
                            <Label className="header_label">Panel</Label>
                            {
                                    header?.type ?
                                        <span className='header_span'>{header?.type === 'client' ? 'Client' : header?.type}</span>
                                        :
                                        ""
                            }
                        </div>
                        <div className='anaylyse-etape'>
                            <Label className="header_label" data-tip='Le score peut aller de -1 à 1'>Score</Label>
                            {

                                    header?.score ?
                                        <span className='header_span' style={{ color: header?.score >= 0 ? 'green' : 'red' }}>{parseFloat(header?.score)}</span>
                                        :
                                        ""
                            }
                        </div>
                        <div className='anaylyse-etape'>
                            <Label className="header_label">Durée (sec)</Label>
                            {

                                    header?.duration ?
                                        <span className='header_span'>{header?.duration}</span>
                                        :
                                        ""
                            }
                        </div>
                        <div className='anaylyse-etape-img'>
                            <Label className="header_label">Résumé</Label>

                            {

                                    header?.score ?
                                        <img src={Eye} alt="2M-advisory" style={{ width: '35px', cursor: 'pointer' }} onClick={() => this.toggle2()} />
                                        :
                                        ""
                            }
                        </div>
                    </div>
                </div>
                {
                    skeleton ?
                        <SkeletonAnalyse />
                        :
                        header?.score ?
                            <>
                                <div className='filter-section'>
                                    <div className='filter-section-left'>
                                        <img src={Filter} alt="" className="img_style2" />
                                        <Label className='filter_text'>Filtrer</Label>
                                        <Button style={{ cursor: "help" }} className={`btn_filter${(btn2 === "moyenne") ? '_selected' : ''}`} onClick={() => this.filter2('moyenne')}
                                            data-tip="Note obtenue à chaque testeur en additionnant tous les scores des étapes et en divisant ce total par le nombre d'étapes."
                                            data-background-color="#F3FBF7"
                                            data-text-color='#000'
                                            data-multiline={true}
                                            data-type='info'
                                        >Moyenne</Button>
                                        <Button style={{ cursor: "help" }} className={`btn_filter${(btn2 === "ecart") ? '_selected' : ''}`} onClick={() => this.filter2('ecart')}
                                            data-tip="L'écart-type sert à mesurer la dispersion, ou l'étalement, d'un ensemble de valeurs autour de leur moyenne. Plus l'écart-type est faible, plus la population est homogène."
                                            data-background-color="#F3FBF7"
                                            data-text-color='#000'
                                            data-multiline={true}
                                            data-type='info'
                                        >Ecart-type</Button>
                                    </div>
                                    <div>
                                        <span className='journey_map' onClick={() => this.filter('map')}>Journey Map Testeur</span>
                                    </div>
                                </div>
                                <div className='chart_container_analyse'>
                                    <div className='chart-section'>
                                        <div className='negativePositeveContainer'>
                                            <div className='negativeBar'> <span className='experienceText' > Expérience negative </span> </div>
                                            <div className='positiveBar'> <span className='experienceText'> Expérience positive </span> </div>
                                        </div>
                                        <div className='chart_style' data-tip='Moyenne des ressentis par étape'>
                                            <LineChart
                                                data={btn2 === 'moyenne' ? dataMoyChart : dataEcartChart}
                                                options={options2}
                                                ref={this.setChartRef}
                                            />

                                        </div>
                                    </div>
                                </div>
                                <div ref={this.myRef} className='chart_container_analyser2'>
                                    <div className='etape-header'>
                                        <Input type="select" name="select" className='btn_filter_select_scena' id="exampleSelect" onChange={this.onChange}>
                                            {this.state.testers?.map((tester, idx) => {
                                                if (idx + 1 === cliqueEtape) {
                                                    return <option key={idx} value={idx} selected>{tester.tester}</option>
                                                } else
                                                    return <option key={idx} value={idx} >{tester.tester}</option>
                                            })
                                            }

                                        </Input>
                                        <span className='duration mx-4'>{this.state.btn2 === "moyenne" ? "Score moyenne: " : "Score de l'écart-type: "} <span className='gras'>{score}</span> </span>
                                        <span className='duration '>Durée moyenne : <span className='gras'>{duration} </span>sec</span>
                                    </div>
                                    {
                                        this.state.selectedRow === -1 ?
                                            <div className='analyseSementiqueNote'>
                                                <span className='analyseSementiqueNoteTitle'>Veuillez s'il vous plaît sélectionner un testeur afin de pouvoir consulter les étapes effectuées par ce dernier.</span>
                                            </div>
                                            :
                                            null
                                    }
                                    <Row className='table-section'>
                                        {this.renderTableClickable()}
                                        {this.renderModalCommentaire()}
                                        {this.renderModalRecap()}
                                    </Row>
                                    {
                                        this.state.footerDisplay ?
                                            <Row className='chat_style-footer mt-5'>
                                                <div className='analyseSementiqueTesterVideoTitle'>   Vidéo du testeur  </div>
                                                <div className='analyseSementiqueTesterVideoContent'>
                                                </div>
                                                <Col md='6' className='analyseSementiqueTesterVideo'>
                                                    <div className='video_box'>
                                                        <div className='video_section'>
                                                            <Player
                                                                fluid={true}
                                                                playsInline
                                                                src={videoEtapUrl}
                                                                poster={Landing}
                                                            />
                                                        </div>
                                                        <div className='download'>
                                                            <Button onClick={this.handleDownload} className='downloadBtn'> Télécharger la video </Button>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col md="4" className='analyseSementiqueTesterReponse'>
                                                    <Answers data={this.state.analyse} />
                                                </Col>
                                                <div ref={this.myRefVideo}></div>
                                            </Row>
                                            :
                                            null
                                    }

                                </div>
                                <ReactTooltip />
                            </>
                            :
                            <NoDataSelected title="Veuillez sélectionner un scénario." />
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    user: state.user,
    scenario: state.scenario,
});

export default connect(
    mapStateToProps,
    {}
)(TesterAnalyzes);