import React from 'react';
import { useHeader } from './HeaderContext'; 

const BaseHeader = () => {
    const { headerContent } = useHeader();
    
    return (
        <div className="header-container">
            Filter | Search | Login/Logout
            {/* Phần nội dung động được thêm từ context */}
            {headerContent}
        </div>
    );
};
export default BaseHeader;