import React from 'react';
import { Alert } from 'antd';


const AlertComponent: React.FC<String> = ( error ) => {
    return (
        <Alert message="Error" description={error} type="error" showIcon />
    );
};

export default AlertComponent;