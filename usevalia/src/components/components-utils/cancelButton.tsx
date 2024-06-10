import React from 'react';
import { Button } from 'antd';

interface CancelButtonProps {
    onClick: () => void;
}

const CancelButton: React.FC<CancelButtonProps> = ({ onClick }) => {
    return (
        <Button type="default" onClick={onClick}>
            Cancel
        </Button>
    );
};

export default CancelButton;