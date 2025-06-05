import React from "react";
import { Skeleton, Space } from 'antd';
import { BarChartOutlined } from '@material-ui/icons';
const SkeletonAnalyse = () => {

    return (
        <Space size={12} direction='vertical'>
        <Space size={12} direction='vertical'>
            <Space direction='horizontal' style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem" }}>
                <Skeleton
                    active
                    title={{ width: 300, height: 50 }}
                    paragraph={{ rows: 0 }}
                />
                <Skeleton
                    active
                    title={{ width: 300, height: 50 }}
                    paragraph={{ rows: 0 }}
                />
            </Space>
            <Skeleton.Node
                style={{ width: 850, height: 450 }}
                active
            >
                <BarChartOutlined />
            </Skeleton.Node>
        </Space>
        <Skeleton.Node
            style={{ width: 700, height: 380 }}
            active
        >
            <BarChartOutlined />
        </Skeleton.Node>
        <Space direction='horizontal' style={{ display: "flex", justifyContent: "space-evenly", marginTop: ".5rem" }}>
            <Skeleton
                active
                title={{ width: 200, height: 50 }}
                paragraph={{ rows: 0 }}
            />
            <Skeleton
                active
                title={{ width: 200, height: 50 }}
                paragraph={{ rows: 0 }}
            />
        </Space>
    </Space>
    )
}
export default SkeletonAnalyse;