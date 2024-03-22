import React, { createContext, useContext, useState } from 'react';

// Tạo Context
const HeaderContext = createContext();

// Custom hook để sử dụng context
export const useHeader = () => useContext(HeaderContext);

// Component Provider để wrap ứng dụng hoặc phần cụ thể của ứng dụng
export const HeaderProvider = ({ children }) => {
    const [headerContent, setHeaderContent] = useState(null);
    return (
        <HeaderContext.Provider value={{ headerContent, setHeaderContent }}>
            {children}
        </HeaderContext.Provider>
    );
};
