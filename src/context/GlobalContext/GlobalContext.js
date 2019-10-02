//react
import React, { createContext } from "react";

//context
import { BiographyContextProvider } from "./../../components/Biography/BiographyContext";
import { EmploymentContextProvider } from "./../../components/Employment/EmploymentContext";
import { EducationContextProvider } from "./../../components/Education/EducationContext";
import { PortfolioContextProvider } from "./../../components/Portfolio/PortfolioContext";
import { HobbyContextProvider } from "./../../components/Hobby/HobbyContext";

//provider
/**
 * (Context Provider) Provides global context to components for subscribed collections
 * @param children - wrapped elements
 * @return JSX component
 */
export const GlobalContextProvider = ({ children }) => {
    return <>
        <GlobalContext.Provider>
            <BiographyContextProvider>
                <EmploymentContextProvider>
                    <EducationContextProvider>
                        <PortfolioContextProvider>
                            <HobbyContextProvider>
                                {children}
                            </HobbyContextProvider>
                        </PortfolioContextProvider>
                    </EducationContextProvider>
                </EmploymentContextProvider>
            </BiographyContextProvider>
        </GlobalContext.Provider>
    </>
};

//context
const GlobalContext = createContext({});
export default GlobalContext;