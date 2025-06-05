import AboutUs from "../components/home/aboutUs"
import OurSolutions from "../components/home/ourSolutions"
import Pricing from "../components/home/pricing"
import LoginForm from "../components/login/login.jsx"
import ClientValidation from "../components/dashboard/admin/users/ClientValidation.jsx"
import DashboardAdmin from "../components/dashboard/admin/dashboardAdmin.jsx"
import SousComptes from "../components/dashboard/admin/users/sousComptes.jsx"
import TesterValidation from "../components/dashboard/admin/users/testerValidation.jsx"
import DashboardClient from "../components/dashboard/client/dashboardClient.jsx"
import LandingPage from "../components/dashboard/Index.jsx"
import lang from "./utils.json"
import ManageSubClient from '../components/manageUser/subcCient/manageSubClient'
import AnaylseIcon from '../assets/insightdata_analyse.svg'
import StatIcon from '../assets/insightdata_statistique.svg'
import SenarioIcon from '../assets/insightdata_senario.svg'
import DashboardIcon from '../assets/insightdata_tableaudebord.svg'
import DashboardIcons from '../assets/insightdata_senario.svg'
import ValidateClientIcon from '../assets/insightdata_validationclient.svg'
import AccountManagementIcon from '../assets/insightdata_gestiondescomptes.svg'
import CreateSenario from "../components/scenario/createSenario"
import CreateSteps from "../components/scenario/createScenario/createSteps"
import TesterPanel from "../components/scenario/testerPanel"
import stepVisualisation from "../components/scenario/createScenario/stepVisualisation"
import PanelList from "../components/scenario/panelList"
import CreatePanelInsight from "../components/scenario/createPanel/createPanelInsight"
import CreatePanelClient from "../components/scenario/createPanel/createPanelClient"
import references from "../components/home/references"
import Profile from "../components/landingPages/tester/profile"
import ProfileCT from "../components/landingPages/clientTester/profile"
import DashboardPageTester from "../components/landingPages/tester/dashboard"
import DashboardPageClientTester from "../components/landingPages/clientTester/dashboard"
import Iban from "../components/landingPages/tester/Iban"
import Questions from "../components/landingPages/tester/questions"
import QuestionsClient from "../components/landingPages/clientTester/questions"
import RawData from "../components/landingPages/client/rawData"
import ListPanels from "../components/dashboard/admin/ListPanels.jsx"
import StepAnalyses from "../components/analyzes/byStep/StepAnalyses"
import FacialRecognition from "../components/analyzes/facialRecognition/facialRecognition"
import FacialRecognitionTester from "../components/analyzes/facialRecognition/facialRecognitionTester"
import TesterAnalyzes from "../components/analyzes/byTester/testerAnalyzes"
import StatPanel from '../components/statistics/panel'
import InfoTester from '../components/landingPages/tester/infoTester'
import TesterChoix from "../components/scenario/testerChoix"
import informations from "../components/manageUser/subcCient/informations"
import { LicencesAdmin } from "../components/dashboard/admin/licencesAdmin"
import ResetPassword from "../components/login/ResetPassword.jsx"
import ClientPanel from "../components/scenario/createPanel/ClientPanel.jsx"
import VisualisationSteps from "../components/scenario/createScenario/VisualisationSteps.jsx"
import ConfirmAccount from '../components/register/client/ConfirmAccount.jsx'
import AuditUXFlashForm from '../components/dashboard/admin/AuditUXFlashForm.jsx'
import PreAuditUXFlashForm from "../components/dashboard/admin/PreAuditUXFlashForm.jsx"
import RapportRecommandations from "../components/dashboard/client/rapport/SyntheseReport.jsx"
import RapportRecommandationsConcret from "../components/dashboard/client/rapport/ConcretReport.jsx"


const authRoutes = () =>
  [
    {
      Name: "",
      path: "/",
      component: LandingPage,
      id: "home"
    },

    {
      path: "/dashboard",
      route: "/",
      component: DashboardPageClientTester,
      id: "dashboard",

    },

    {
      path: "/iban",
      route: "/",
      component: Iban,
      id: "iban"
    },
    {
      path: "/profile",
      route: "/",
      component: ProfileCT,
      id: "profile"
    },
    {
      path: "/infotester",
      route: "/",
      component: InfoTester,
      id: "infotester"
    },
    {
      path: "/question/",
      route: "/",
      component: QuestionsClient,
      id: "questions"
    },
  ];

const menuLandingClient = (lng) => [
  {
    Name: lang[lng].dashboard,
    icon: <img style={{ width: "60px", height: '48px' }} src={DashboardIcon} alt='' />,
    path: "/",
    route: "/",
    component: DashboardClient,
    id: "dashboardClient"
  },
  {
    Name: "Scenarios",
    icon: <img style={{ width: "60px", height: '48px' }} src={SenarioIcon} alt='' />,
    path: "/scenario",
    route: "/",
    id: "scenarios"
  },
  {
    Name: "",
    icon: <img style={{ width: "60px", height: '48px' }} src={SenarioIcon} alt='' />,
    path: "/createscenario",
    route: "/",
    component: CreateSenario,
    id: "createSenario"
  },
  {
    Name: "",
    icon: <img style={{ width: "60px", height: '48px' }} src={SenarioIcon} alt='' />,
    path: "/testerpanel",
    route: "/",
    component: TesterPanel,
    id: "testerPanel"
  },
  {
    Name: "",
    icon: <img style={{ width: "60px", height: '48px' }} src={SenarioIcon} alt='' />,
    path: "/testerchoix",
    route: "/",
    component: TesterChoix,
    id: "testerChoixPanel"
  },
  {
    Name: "",
    icon: <img style={{ width: "60px", height: '48px' }} src={SenarioIcon} alt='' />,
    path: "/panellist",
    route: "/",
    component: PanelList,
    id: "panelList"
  },
  {
    Name: "",
    path: "/createsteps",
    component: CreateSteps,
    id: "createSteps"
  },
  {
    Name: "",
    path: "/visualisation",
    component: stepVisualisation,
    id: "stepVisualisation"
  },
  {
    Name: "",
    path: "/createpanel",
    component: CreatePanelInsight,
    id: "createInsightPanel"
  },
  {
    Name: "",
    path: "/createpanelclt",
    component: CreatePanelClient,
    id: "createClientPanel"
  },
  {
    Name: "",
    path: "/panelDetails",
    component: ClientPanel,
    id: "detailsPanel"
  },
  {
    Name: "Résulats",
    icon: <img style={{ width: "60px", height: '48px' }} src={StatIcon} alt='' />,
    path: "/statistics",
    route: "/",
    component: RawData,
    id: "rawData"
  },
  {
    Name: "",
    path: "/panelStatistics",
    route: "/",
    component: StatPanel,
    id: "statPanel"
  },
  {
    Name: "Analyse IA",
    icon: <img style={{ width: "60px", height: '48px' }} src={AnaylseIcon} alt='' />,
    path: "/step-analyze",
    route: "/",
    component: StepAnalyses,
    id: "analyseIA"
  },
  {
    Name: "",
    path: "/tester-analyze",
    route: "/",
    component: TesterAnalyzes,
    id: "testerAnalyzes"
  },
  {
    Name: "",
    path: "/facial-recognition",
    route: "/",
    component: FacialRecognition,
    id: "facialRecognition"
  },
  {
    Name: "",
    path: "/tester-facial-recognition",
    route: "/",
    component: FacialRecognitionTester,
    id: "facialRecognitionTester"
  },
  {
    Name: "",
    icon: <img style={{ width: "60px", height: '48px' }} src={AccountManagementIcon} alt='' />,
    path: "/usesmanage",
    route: "/",
    component: ManageSubClient,
    id: "manageSubClient"
  },
  {
    Name: "",
    path: "/StepsTest", 
    route: "/",
    component: VisualisationSteps,
    id: "stepsTest"
  },
  {
    Name: "Recommandations UX",
    icon: <img style={{ width: "60px", height: '48px' }} src={AccountManagementIcon} alt='' />,
    path: "/recommendations",
    route: "/",
    component: RapportRecommandations,
    id: "recommendations"
  },
  {
    Name: "",
    icon: <img style={{ width: "60px", height: '48px' }} src={AccountManagementIcon} alt='' />,
    path: "/recommendations/concrete",
    route: "/",
    component: RapportRecommandationsConcret,
    id: "recommendations"
  },
  {
    Name: "Mon Compte",
    icon: <img style={{ width: "60px", height: '48px' }} src={AccountManagementIcon} alt='' />,
    path: "/clientmanage",
    route: "/",
    component: informations,
    id: "informations"
  },

]



const menuLandingTester = (lng) => [
  {
    Name: "TABLEAU DE BORD",
    icon: <img style={{ width: "60px", height: '60px' }} src={DashboardIcon} alt='' />,
    path: "/dashboard",
    route: "/tester",
    component: DashboardPageTester,
    id: "dashboard",

  },
  {
    Name: "DOCUMENTS",
    icon: <img style={{ width: "60px", height: '60px' }} src={DashboardIcons} alt='' />,
    path: "/iban",
    route: "/",
    component: Iban,
    id: "iban"
  },
  {
    Name: "MON COMPTE",
    icon: <img style={{ width: "60px", height: '60px' }} src={DashboardIcons} alt='' />,
    path: "/profile",
    route: "/",
    component: Profile,
    id: "profile"
  },
  {
    Name: "",
    icon: <img style={{ width: "60px", height: '60px' }} src={DashboardIcons} alt='' />,
    path: "/questions",
    route: "/",
    component: Questions,
    id: "questions"
  },
  {
    path: "/infotester",
    route: "/",
    component: InfoTester,
    id: "infotester"
  },
]

const menuLandingClientTester = (lng) => [
  {
    path: "/dashboard",
    route: "/",
    component: DashboardPageClientTester,
    id: "dashboard",

  },
  {
    path: "/iban",
    route: "/",
    component: Iban,
    id: "iban"
  },
  {
    path: "/profile",
    route: "/",
    component: ProfileCT,
    id: "profile"
  },
  {
    path: "/",
    route: "/",
    component: QuestionsClient,
    id: "questions"
  },
]


const menuLandingTesterInsight = (lng) => [
  {
    Name: "Tableau de Bord",
    icon: <img style={{ width: "60px", height: '60px' }} src={DashboardIcon} alt='' />,
    path: "/dashboard",
    route: "/",
    component: DashboardPageClientTester,
    id: "dashboardTesterInsight",

  },
  {
    Name: "Mon Compte",
    icon: <img style={{ width: "60px", height: '60px' }} src={DashboardIcons} alt='' />,
    path: "/profile",
    route: "/",
    component: ProfileCT,
    id: "profileTesterInsight"
  },
]


const menuLandingAdmin = (lng) => [
  {
    Name: "Tableau de Bord",
    icon: <img style={{ width: "60px", height: '48px' }} src={DashboardIcon} alt='' />,
    path: "/",
    route: "/",
    component: DashboardAdmin,
    id: "dashboard"
  },
  {
    Name: "",
    icon: <img style={{ width: "60px", height: '48px' }} src={ValidateClientIcon} alt='' />,
    path: "/clientValidation",
    route: "/",
    component: ClientValidation,
    id: "clientValidation"
  },
  {
    Name: "",
    icon: <img style={{ width: "60px", height: '48px' }} src={ValidateClientIcon} alt='' />,
    path: "/sousComptes",
    route: "/",
    component: SousComptes,
    id: "sousComptes"
  },
  {
    Name: "",
    icon: <img style={{ width: "60px", height: '48px' }} src={ValidateClientIcon} alt='' />,
    path: "/licences",
    route: "/",
    component: LicencesAdmin,
    id: "licence"
  },
  {
    Name: "",
    icon: <img style={{ width: "60px", height: '48px' }} src={ValidateClientIcon} alt='' />,
    path: "/testerValidation",
    route: "/",
    component: TesterValidation,
    id: "testerValidation"
  },
  {
    Name: "Panel",
    icon: <img style={{ width: "60px", height: '48px' }} src={SenarioIcon} alt='' />,
    path: "/listPanels",
    route: "/",
    component: ListPanels,
    id: "listPanels"
  },
  {
    Name: "Espace Admin",
    icon: <img style={{ width: "60px", height: '48px' }} src={AccountManagementIcon} alt='' />,
    path: "/manageusers",
    id: "manageusers"
  },
  {
    Name: "Statistique",
    icon: <img style={{ width: "60px", height: '48px' }} src={StatIcon} alt='' />,
    path: "/statistics",
    route: "/",
    component: RawData,
    id: "statAllDataAdminSide"
  },
  {
    Name: "",
    path: "/panelStatistics",
    route: "/",
    component: StatPanel,
    id: "statPanel"
  },
  {
    Name: "Analyse",
    icon: <img style={{ width: "60px", height: '48px' }} src={AnaylseIcon} alt='' />,
    path: "/step-analyze",
    route: "/",
    component: StepAnalyses,
    id: "analyse"
  },
  {
    Name: "",
    path: "/tester-analyze",
    route: "/",
    component: TesterAnalyzes,
    id: "testerAnalyze"
  },
  {
    Name: "",
    path: "/facial-recognition",
    route: "/",
    component: FacialRecognition,
    id: "facialRecognition"
  },
  {
    Name: "",
    path: "/tester-facial-recognition",
    route: "/",
    component: FacialRecognitionTester,
    id: "facialRecognitionTester"
  },
  {
    Name: "Rapports",
    icon: <img style={{ width: "60px", height: '48px' }} src={AccountManagementIcon} alt='' />,
    path: "/rapports",
    route: "/",
    id: "rapports"
  },
  {
    Name: "",
    path: "/pre-audit/ux/flash/form",
    route: "/",
    component: PreAuditUXFlashForm,
    id: "preAuditUXFlashForm"
  },
  {
    Name: "",
    path: "/audit/ux/flash/form",
    route: "/",
    component: AuditUXFlashForm,
    id: "auditUXFlashForm"
  },
]


const Routes = (lng) =>
  [
    {
      Name: lang[lng].presentation,
      path: "/presentation",
      component: AboutUs,
      id: "presentation"
    },
    {
      Name: lang[lng].solutions,
      path: "/solution",
      component: OurSolutions,
      id: "solution"
    },
    {
      Name: lang[lng].pricing,
      path: "/pricing",
      component: Pricing,
      id: "pricing"
    },
    {
      Name: lang[lng].blog,
      path: "/blog",
      component: references,
      id: "home"
    },
    {
      Name: lang[lng].login,
      path: "/login",
      component: LoginForm,
      id: "login"
    },
    {
      Name: "Reset Password",
      path: "/respass",
      component: ResetPassword,
      id: "respass"
    },
    {
      Name: '',
      path: "/confirm/client/account",
      component: ConfirmAccount,
      id: "confirmClientAccount"
    }
  ];

export { menuLandingTesterInsight, authRoutes, Routes, menuLandingClient, menuLandingTester, menuLandingAdmin, menuLandingClientTester }