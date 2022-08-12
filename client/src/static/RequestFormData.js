export const Hospitals = [
    {
        DisplayName: "לניאדו",
        Region: "צפון",
        City: "נתניה",
        Departments: ["Surgical", "Pediatric", "Gynecologiy"]
    },
    {
        DisplayName: "מאיר",
        Region: "מרכז",
        City: "כפר סבא",
        Departments: ["Surgical"]
    },
    {
        DisplayName: "תל השומר",
        Region: "מרכז",
        City: "רמת גן",
        Departments: ["Surgical", "Psychiatry", "Gynecologiy"]
    },
    {
        DisplayName: "שערי צדק",
        Region: "ירושלים",
        City: "ירושלים",
        Departments: ["Pediatric", "Intensive-care"]
    }
]


export const Regions = ["צפון", "דרום", "מרכז", "ירושלים"]

export const Experiences = {
    "Internal": "פנימית",
    "Geriatric": "גריאטריה",
    "Surgical": "כירורגית",
    "EmergencyRoom": "מיון",
    "Gynecologiy": "נשים",
    "Peggy" : "פגיה",
    "milk": "טיפת חלב",
    "Birth": "יולדות",
    "Community": "קופת חולים",
    "Clicincs": "מרפאות",
    "Advance": "התנסות קלינית מתקדמת",
    "PediatricClicincs" : "מרפאות ילדים",
    "PediatricEmergencyRoom" : "מיון ילדים",
    "Pediatric": "ילדים",
    "Psychiatry" : "פסיכיאטריה"
}
export const Data = [
    {
        GroupName: "סיעוד המבוגר",
        Area: [{
            AreaName: "סיעוד המבוגר פנימי",
            Departments: ["Internal", "Geriatric"]
        },
        {
            AreaName: "סיעוד המבוגר כירורגי",
            Departments: ["Surgical"]
        },
        ]
    },
    {
        GroupName: "טראומה",
        Area: [{
            AreaName: "סיעוד במצבים דחופים וטראומה",
            Departments: ["EmergencyRoom"]
        }]
    },
    {
        GroupName: "סיעוד האישה",
        Area: [{
            AreaName: "סיעוד האישה",
            Departments: ["Gynecologiy", "Birth", "Peggy", "milk"]
        }]
    },
    {
        GroupName: "סיעוד בקהילה",
        Area: [{
            AreaName: "סיעוד בקהילה",
            Departments: ["Community", "Clicincs", "milk"]
        }]
    },
    {
        GroupName: "סיעוד הילד",
        Area: [{
            AreaName: "סיעוד הילד",
            Departments: ["Community", "PediatricClicincs","PediatricEmergencyRoom", "milk"]
        }]
    },
    {
        GroupName: "בריאות הנפש",
        Area: [{
            AreaName: "סיעוד בריאות הנפש",
            Departments: ["Psychiatry"]
        }]
    },
    {
        GroupName: "חטיבה עליונה",
        Area: [{
            AreaName: "התנסות קלינית ייחודית",
            Departments: ["Community", "PediatricClicincs","PediatricEmergencyRoom", "milk", "Psychiatry", "Community", "Clicincs", "milk", "Gynecologiy", "Birth", "Peggy", "Internal", "Geriatric", "Surgical", "EmergencyRoom"]
        },
        {
            AreaName: "התנסות קלינית מתקדמת",
            Departments: ["Community", "PediatricClicincs","PediatricEmergencyRoom", "milk", "Psychiatry", "Community", "Clicincs", "milk", "Gynecologiy", "Birth", "Peggy", "Internal", "Geriatric", "Surgical", "EmergencyRoom"]
        },
        ]
    },






    {
        GroupName: "טראומה",
        Departments: ["Intensive-care"]
    },
    {
        GroupName: "סיעוד האישה",
        Departments: ["Gynecologiy"]
    },
    {
        GroupName: "סיעוד האישה",
        Departments: ["Gynecologiy"]
    },
    {
        GroupName: "סיעוד בקהילה",
        Departments: ["Community"]
    },
    {
        GroupName: "סיעוד הילד",
        Departments: ["Pediatric"]
    },
    {
        GroupName: "בריאות הנפש",
        Departments: ["Psychiatry"]
    },
    {
        GroupName: "חטיבה עליונה",
        Departments: ["Special", "Advance"]
    },
]
