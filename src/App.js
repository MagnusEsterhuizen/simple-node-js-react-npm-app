//react
import React, { useEffect, useContext } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

//helpers
import consumeMETA from "./helpers/consumeMETA/consumeMETA";

//material-ui
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Hidden from "@material-ui/core/Hidden";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";

//context
import AuthorizeContext, { AuthorizeRoute } from "./context/AuthorizeContext/AuthorizeContext";
import { GlobalContextProvider } from "./context/GlobalContext/GlobalContext";
import { RequestContextProvider } from "./components/Request/RequestContext";

//components:general
import NavBar from "./components/NavBar/NavBar";
import Aside from "./components/Aside/Aside";
import SignIn from "./components/SignIn/SignIn";
import Request from "./components/Request/Request";
import PageNotFound from "./components/PageNotFound/PageNotFound";

//components
import BiographyView from "./components/Biography/BiographyView";
import EmploymentView from "./components/Employment/EmploymentView";
import EducationView from "./components/Education/EducationView";
import PortfolioView from "./components/Portfolio/PortfolioView";
import HobbyView from "./components/Hobby/HobbyView";
import OnePageScroller from "./components/OnePageScroller/OnePageScroller";
import OnePagePrint from "./components/OnePagePrint/OnePagePrint";
import Footer from "./components/Footer/Footer";

//elements
import SpinnerLoader from "./elements/SpinnerLoader/SpinnerLoader";

//styles
const asideWidth = 240;
/**
 * (Styles & Classes) Defines the CSS styles and classes for this component
 * @return generated classNames for component
 */
function getClasses() {
	return {
		...(makeStyles(theme => ({
			"@global": {
				".MuiContainer-root": {
					[theme.breakpoints.down("xs")]: {
						margin: 0,
						padding: 0,
					}
				},
				body: {
					backgroundColor: "#eeeeee!important"
				}
			},
			root: {
				display: "flex",
				[theme.breakpoints.down("xs")]: {
					display: "block"
				},
			},
			asideContainer: {
				minWidth: asideWidth,
				maxWidth: asideWidth,
				marginTop: theme.spacing(11),
				marginBottom: theme.spacing(3),
				position: "relative",
				[theme.breakpoints.down("xs")]: {
					marginTop: theme.spacing(1),
					maxWidth: "100%",
					width: "100%",
					position: "relative",
					height: "auto",
					display: "block"
				},
			},
			aside: {
				minWidth: asideWidth,
				maxWidth: asideWidth,
				top: 0,
				bottom: theme.spacing(3),
				position: "relative",
				[theme.breakpoints.down("xs")]: {
					top: theme.spacing(6),
					maxWidth: "100%",
					width: "100%",
					position: "relative",
					height: "auto",
					display: "block"
				},
				backgroundColor: theme.palette.primary.main,
				color: theme.palette.common.white,
				overflow: "hidden"
			},
			main: {
				flexGrow: 1,
				padding: theme.spacing(3, 0, 3, 3),
				position: "relative",
				[theme.breakpoints.down("xs")]: {
					padding: theme.spacing(7, 0, 0, 0),
				}
			},
			footer: {
				padding: theme.spacing(0),
				position: "relative",
				[theme.breakpoints.down("xs")]: {
					padding: theme.spacing(7, 0, 0, 0),
				}
			},
			toolbar: theme.mixins.toolbar
		})))()
	}
}

//presentation
/**
 * (Presentation Component) Initiates the Online Resume System
 * @param data  - data objects
 * - data[authGroup] - authorized user group
 * @param control - control functions
 * @param render - render components
 * @param props - props extra
 * @return JSX component
 */
export const App = ({ data, control, render, ...props }) => {
	const { authGroup } = data;
	const biographyId = "u0SXQNeNP3LAjtxH8Ksy";

	const classes = getClasses();
	if (authGroup) {
		return <>
			<GlobalContextProvider>
				<BrowserRouter>
					<CssBaseline />
					<Container maxWidth="md" className={classes.root}>

						<header id="AppHeader">
							<NavBar documentId={biographyId} />
						</header>

						<aside className={classes.asideContainer}>
							<Paper className={`aside ${classes.aside}`} >
								<Aside
									documentId={biographyId}
									isEdit={false}
								/>
							</Paper>
						</aside>

						<main className={classes.main} >
							<div>
								<Hidden xsDown>
									<div className={classes.toolbar} id="divToolbar"/>
								</Hidden>
								<Switch>

									{/*biography*/}
									<AuthorizeRoute /*edit*/
										exact
										path="/biography/edit"
										authGroup={authGroup}
										component={() =>
											<BiographyView
												documentId={biographyId}
												isPaper={true}
												template="edit"
											/>
										}
									/>

									{/*employment*/}
									<AuthorizeRoute /*new*/
										exact
										path="/employment/new"
										authGroup={authGroup}
										component={() => <EmploymentView />}
									/>
									<AuthorizeRoute /*view*/
										exact
										path="/employment/:position"
										authGroup={authGroup}
										component={() => <EmploymentView />}
									/>
									<AuthorizeRoute /*edit*/
										exact
										path="/employment/:id/edit"
										authGroup={authGroup}
										component={() => <EmploymentView />}
									/>

									{/*education*/}
									<AuthorizeRoute /*new*/
										exact
										path="/education/new"
										authGroup={authGroup}
										component={() => <EducationView />}
									/>
									<AuthorizeRoute /*view*/
										exact
										path="/education/:grade"
										authGroup={authGroup}
										component={() => <EducationView />}
									/>
									<AuthorizeRoute /*edit*/
										exact
										path="/education/:id/edit"
										authGroup={authGroup}
										component={() => <EducationView />}
									/>

									{/*portfolio*/}
									<AuthorizeRoute /*new*/
										exact
										path="/portfolio/new"
										authGroup={authGroup}
										component={() => <PortfolioView />}
									/>
									<AuthorizeRoute /*view*/
										exact
										path="/portfolio/:title"
										authGroup={authGroup}
										component={() => <PortfolioView />}
									/>
									<AuthorizeRoute /*edit*/
										exact
										path="/portfolio/:id/edit"
										authGroup={authGroup}
										component={() => <PortfolioView />}
									/>

									{/*hobby*/}
									<AuthorizeRoute /*new*/
										exact
										path="/hobbies/new"
										authGroup={authGroup}
										component={() => <HobbyView />}
									/>
									<AuthorizeRoute /*view*/
										exact
										path="/hobbies/:title"
										authGroup={authGroup}
										component={() => <HobbyView />}
									/>
									<AuthorizeRoute /*edit*/
										exact
										path="/hobbies/:id/edit"
										authGroup={authGroup}
										component={() => <HobbyView />}
									/>

									{/*signin*/}
									<Route exact path="/signin" render={({ history }) =>
										authGroup !== "guest"
											? history.location.state !== undefined
												? <Redirect to={history.location.state.from} />
												: <Redirect to="/" />
											: <SignIn isPaper={true} />
									} />
									<Route exact path="/signin/:authString" render={({ history }) =>
										authGroup !== "guest"
											? history.location.state !== undefined
												? <Redirect to={history.location.state.from} />
												: <Redirect to="/" />
											: <SignIn isPaper={true} />
									} />

									{/*request*/}
									<Route exact path="/request" render={({ history }) =>
										authGroup !== "guest"
											? history.location.state !== undefined
												? <Redirect to={history.location.state.from} />
												: <Redirect to="/" />
											:
											<RequestContextProvider>
												<Request history={history} isPaper={true} />
											</RequestContextProvider>
									} />

									{/*print*/}
									<Route
										exact
										path="/print"
										render={() =>
											<RequestContextProvider>
												<OnePagePrint biographyId={biographyId} />
											</RequestContextProvider>
										}
									/>

									{/*portfolio*/}
									<AuthorizeRoute
										path="/portfolio"
										authGroup={authGroup}
										component={() =>
											<RequestContextProvider>
												<OnePageScroller biographyId={biographyId} />
											</RequestContextProvider>
										}
									/>

									{/*hobbies*/}
									<AuthorizeRoute
										path="/hobbies"
										authGroup={authGroup}
										component={() =>
											<RequestContextProvider>
												<OnePageScroller biographyId={biographyId} />
											</RequestContextProvider>
										}
									/>

									{/*diplomas*/}
									<AuthorizeRoute
										path="/diplomas"
										authGroup={authGroup}
										component={() =>
											<RequestContextProvider>
												<OnePageScroller biographyId={biographyId} />
											</RequestContextProvider>
										}
									/>

									{/*references*/}
									<AuthorizeRoute
										path="/references"
										authGroup={authGroup}
										component={() =>
											<RequestContextProvider>
												<OnePageScroller biographyId={biographyId} />
											</RequestContextProvider>
										}
									/>

									{/*onePageScroller*/}
									<Route
										path="/:page"
										render={() =>
											<RequestContextProvider>
												<OnePageScroller biographyId={biographyId} />
											</RequestContextProvider>
										}
									/>

									{/*home*/}
									<Route
										path="/"
										render={() =>
											<RequestContextProvider>
												<OnePageScroller biographyId={biographyId} />
											</RequestContextProvider>
										}
									/>

									{/*other*/}
									<Route render={() => <PageNotFound />} />

								</Switch>
							</div>
							<footer className={classes.footer}>
								<Footer />
							</footer>
						</main>

					</Container>
				</BrowserRouter>
			</GlobalContextProvider>
		</>
	}
	else {
		return <SpinnerLoader />
	}
}

//container
/**
 * (Container Component) Initiates the Online Resume System
 * @return JSX component
 */
export default function () {
	const { authGroup } = useContext(AuthorizeContext);

	//update page title and meta tags, load js and css
	useEffect(() => {
		consumeMETA({
			title: "Magnus Esterhuizen - Curiculum Vitae",
			head: [
				{ meta: { name: "description", content: "" } },
				{ meta: { name: "keywords", content: "" } },
				{ link: { rel: "canonical", href: "" } },
				{ link: { rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" } },
				{ link: { rel: "stylesheet", href: "http://fonts.googleapis.com/icon?family=Material+Icons" } },
				{ script: { src: "/assets/hotjar/hotjar.js" } },
			],
			body: [
				{ script: { src: "https://kit.fontawesome.com/64456708e7.js" } },
				{ script: { src: "/assets/stickyAside/stickyAside.js" } }
			]
		});
	}, []);

	return App({
		data: {
			authGroup
		},
		control: {},
		render: {}
	});
}