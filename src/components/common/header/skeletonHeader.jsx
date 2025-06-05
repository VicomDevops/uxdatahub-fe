import React from "react";
import { Skeleton, Space } from 'antd';


const SkeletonHeader = () => {

    return (
        <Space size={12} direction='horizontal' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Skeleton
            active
            title={{ width: 50, height: 10 }}
            paragraph={{ rows: 0 }}
        />
    </Space>
    )
}
export default SkeletonHeader;