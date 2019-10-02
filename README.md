# Online Résumé System Dev

## Demo Accounts

### Users can view basic Résumé

#### * [Guest Account](http://businessbox1.dedicated.co.za).

### Users can view complete Résumé

#### * [Viewer Account](http://businessbox1.dedicated.co.za/signin/dW46dmlld2VyQGNoYXJsaWUtYnJvd24uY29tJnB3OlwvaWV3ZXJVJGVyAze4aG).

### Users can view and edit complete Résumé

#### * [Admin Account](http://businessbox1.dedicated.co.za/signin/dW46YWRtaW5AY2hhcmxpZS1icm93bi5jb20mcHc6QGRtaW5VJGVyAze4aG).

## 1. Installation Instructions Database

### a. Create Firebase account

#### Navigate to

#### * `https://firebase.google.com/`

#### Create new Project

#### * `Online-Résumé-System`

#### Add a Web App </> to Project

#### * `Online Résumé System`

### b. Create new Database

#### `test mode`

### c. Setup Database
	{
		"biography": {
			[document-id]: {
				"address": [string],
				"availability": [string],
				"birthday": [timestamp],
				"coverImage": [string],
				"coverTitle": [string],
				"currentPosition": [string],
				"description": [string],
				"drivers": [string],
				"email": [string],
				"equity": [string],
				"experience1": [string],
				"experience10": [string],
				"experience2": [string],
				"experience3": [string],
				"experience4": [string],
				"experience5": [string],
				"experience6": [string],
				"experience7": [string],
				"experience8": [string],
				"experience9": [string],
				"experienceLevel1": [number],
				"experienceLevel10": [number],
				"experienceLevel2": [number],
				"experienceLevel3": [number],
				"experienceLevel4": [number],
				"experienceLevel5": [number],
				"experienceLevel6": [number],
				"experienceLevel7": [number],
				"experienceLevel8": [number],
				"experienceLevel9": [number],
				"experiencePrimary": [string],
				"experienceSecondary": [string],
				"firstname": [string],
				"gender": [string],
				"github": [string],
				"id": [document-id],
				"idNo": [string],
				"index": [string],
				"language1": [string],
				"language2": [string],
				"lastname": [string],
				"linkedin": [string],
				"location": [string],
				"married": [string],
				"pdfGuest": [string],
				"pdfSummary": [string],
				"pdfViewer": [string],
				"phone": [string],
				"remote": [string],
				"secondname": [string],
				"skype": [string],
			}
		},
		"education": {
			[document-id]: {
				"dateTo": [timestamp],
				"description": [string],
				"diploma1": [string],
				"diploma2": [string],
				"diploma3": [string],
				"diploma4": [string],
				"diplomaPath1": [string],
				"diplomaPath2": [string],
				"diplomaPath3": [string],
				"fulltime": [string],
				"grade": [string],
				"id": [document-id],
				"index": [string],
				"school": [string],
				"subject1": [string],
				"subject10": [string],
				"subject2": [string],
				"subject3": [string],
				"subject4": [string],
				"subject5": [string],
				"subject6": [string],
				"subject7": [string],
				"subject8": [string],
				"subject9": [string],
				"subjectColor1": [string],
				"subjectColor2": [string],
				"subjectColor3": [string],
				"subjectColor4": [string],
				"subjectColor5": [string],
				"subjectColor6": [string],
				"subjectColor7": [string],
			}
		},
		"employment": {
			[document-id]: {
				"company": [string],
				"dateFrom": [timestamp],
				"description": [string],
				"duty1": [string],
				"duty10": [string],
				"duty2": [string],
				"duty3": [string],
				"duty4": [string],
				"duty5": [string],
				"duty6": [string],
				"duty7": [string],
				"duty8": [string],
				"duty9": [string],
				"id": [document-id],
				"index": [string],
				"position": [string],
				"referenceEmail": [string],
				"referenceEmail2": [string],
				"referenceMobile": [string],
				"referenceMobile2": [string],
				"referenceName": [string],
				"referenceName2": [string],
				"referencePath": [string],
				"referencePath2": [string],
				"skill1": [string],
				"skill10": [string],
				"skill2": [string],
				"skill3": [string],
				"skill4": [string],
				"skill5": [string],
				"skill6": [string],
				"skill7": [string],
				"skill8": [string],
				"skill9": [string],
				"skillColor1": [string],
				"skillColor10": [string],
				"skillColor2": [string],
				"skillColor3": [string],
				"skillColor4": [string],
				"skillColor5": [string],
				"skillColor6": [string],
				"skillColor7": [string],
				"skillColor8": [string],
				"skillColor9": [string],
			}
		},
		"hobby": {
			[document-id]: {
				"description": [string],
				"id": [document-id],
				"image1": [string],
				"image2": [string],
				"image3": [string],
				"imagePath1": [string],
				"imagePath2": [string],
				"imagePath3": [string],
				"imagePath4": [string],
				"index": [string],
				"title": [string],
			}
		},
		"permission": {
			[document-id]: {
				"email": [string],
				"group": [string], (guest | viewer | admin)
				"uid": [string],
			}
		},
		"portfolio": {
			[document-id]: {
				"dateFrom":[timestamp],
				"dateTo": [timestamp],
				"demoLink": [string],
				"description": [string],
				"id": [document-id],
				"imagePath": [string],
				"index": [string],
				"screenshot1": [string],
				"screenshot2": [string],
				"screenshot3": [string],
				"screenshot4": [string],
				"screenshot5": [string],
				"screenshot6": [string],
				"screenshot7": [string],
				"screenshot8": [string],
				"screenshot9": [string],
				"screenshotDescription1": [string],
				"screenshotDescription2": [string],
				"screenshotDescription3": [string],
				"screenshotDescription4": [string],
				"screenshotDescription5": [string],
				"screenshotDescription6": [string],
				"screenshotDescription7": [string],
				"screenshotDescription8": [string],
				"screenshotDescription9": [string],
				"screenshotPath1": [string],
				"screenshotPath2": [string],
				"screenshotPath3": [string],
				"screenshotPath4": [string],
				"screenshotPath5": [string],
				"screenshotPath6": [string],
				"screenshotPath7": [string],
				"screenshotPath8": [string],
				"screenshotPath9": [string],
				"sourceLink": [string],
				"subTitle": [string],
				"tech1": [string],
				"tech10": [string],
				"tech2": [string],
				"tech3": [string],
				"tech4": [string],
				"tech5": [string],
				"tech6": [string],
				"tech7": [string],
				"tech8": [string],
				"tech9": [string],
				"techColor1": [string],
				"techColor2": [string],
				"techColor3": [string],
				"techColor4": [string],
				"techColor5": [string],
				"techColor6": [string],
				"techColor7": [string],
				"techColor8": [string],
				"techColor9": [string],
				"title": [string],
			}
		}
	}

### d. Create new Authentication Method

#### * `email & password`

#### Create new Authentication User

#### * `username: yourName@yourEmailAddress.com`

#### * `password: yourVerySecretPassword`

#### Save user

#### * `Copy and keep UID for next step - eg. UomyG0zVDYmiYFklOVjDY27moU8d`

### e. Create a new document in the Permission collection

	[document-id]: {
		"email": [email address],
		"group": [guest | viewer | admin],
		"uid": [UID]
	}


#### Example

	kG0DYmomyDYlOVU2zV8j7iYFmoUd: {
		"email": "yourName@yourEmailAddress",
		"group": "admin",
		"uid": UomyG0zVDYmiYFklOVjDY27moU8d,
	}


## 2. Installation Instructions GUI

### a. Install node.js and npm

#### * `apt-get install nodejs`

### b. Create a new React App

#### * `npx create-react-app Online-Résumé-System`

### c. Clone repository indide folder Online-Résumé-System

#### * `git clone https://github.com/MagnusEsterhuizen/Online-Résumé-System.git`

### d. Install Node.js dependencies

#### * `npm install @date-io/moment`

#### * `npm install @material-ui/core`

#### * `npm install @material-ui/icons`

#### * `npm install @material-ui/pickers`

#### * `npm install @nivo/pie`

#### * `npm install firebase`

#### * `npm install moment`

#### * `npm install nivo`

#### * `npm install react`

#### * `npm install react-dom`

#### * `npm install react-material-color-picker`

#### * `npm install react-quill-2`

#### * `npm install react-router-dom`

#### * `npm install react-scripts`

### e. Create project build

#### * `npm run build`

### f. Allow ufw firewall port

#### * `ufw allow 5000/tcp`

### g. Install basic server

#### * `npm install -g serve`

### h. Run basic server

#### * `serve -s build`

Runs the app in the production mode.<br>
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.