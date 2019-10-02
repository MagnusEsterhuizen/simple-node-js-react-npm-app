const biographyKeep = ["availability",
    "coverImage",
    "coverTitle",
    "currentPosition",
    "description",
    "email",
    "experience1",
    "experience10",
    "experience2",
    "experience3",
    "experience4",
    "experience5",
    "experience6",
    "experience7",
    "experience8",
    "experience9",
    "experienceLevel1",
    "experienceLevel10",
    "experienceLevel2",
    "experienceLevel3",
    "experienceLevel4",
    "experienceLevel5",
    "experienceLevel6",
    "experienceLevel7",
    "experienceLevel8",
    "experienceLevel9",
    "experiencePrimary",
    "experienceSecondary",
    "facebook",
    "firstname",
    "gender",
    "github",
    "id",
    "index",
    "language1",
    "language2",
    "language3",
    "lastname",
    "linkedin",
    "location",
    "phone",
    "remote",
    "secondname",
    "skype",
    "timezone",
    "twitter",
    "pdfGuest"
];

const employmentKeep = [
    "company",
    "dateFrom",
    "dateTo",
    "description",
    "position",
    "id",
    "index",
    "skill1",
    "skill2",
    "skill3",
    "skill4",
    "skill5",
    "skill6",
    "skill7",
    "skill8",
    "skill9",
    "skill10",
    "skillColor1",
    "skillColor2",
    "skillColor3",
    "skillColor4",
    "skillColor5",
    "skillColor6",
    "skillColor7",
    "skillColor8",
    "skillColor9",
    "skillColor10",
];

const educationKeep = [
    "dateFrom",
    "dateTo",
    "description",
    "grade",
    "id",
    "index",
    "school",
    "subject1",
    "subject2",
    "subject3",
    "subject4",
    "subject5",
    "subject6",
    "subject7",
    "subject8",
    "subject9",
    "subject10",
    "subjectColor1",
    "subjectColor2",
    "subjectColor3",
    "subjectColor4",
    "subjectColor5",
    "subjectColor6",
    "subjectColor7",
    "subjectColor8",
    "subjectColor9",
    "subjectColor10",
];

const portfolioKeep = [];

/**
 * (Remove Fields) After authorization - decide which fields to remove according to user auth group
 * @param collection - collection name
 * @param data - document data object
 * @param authGroup - authorized user group
 * @return Object - authorized fields
 */
export default (collection, data, authGroup) => {
    //console.log(collection, data, authGroup)
    if (authGroup === "guest") {
        switch (collection) {
            case "biography":
                for (const key in data) {
                    if (biographyKeep.indexOf(key) === -1) {
                        delete data[key];
                    }
                }
                return data;
            case "employment":
                for (const key in data) {
                    if (employmentKeep.indexOf(key) === -1) {
                        delete data[key];
                    }
                }
                return data;
            case "education":
                for (const key in data) {
                    if (educationKeep.indexOf(key) === -1) {
                        delete data[key];
                    }
                }
                return data;
            case "portfolio":
                for (const key in data) {
                    if (portfolioKeep.indexOf(key) === -1) {
                        delete data[key];
                    }
                }
                return data;
            default:
                return data;
        }
    }
    else if (authGroup === "admin" || authGroup === "viewer") {
        //console.log("data admin viewer", data)
        return data;
    }
}