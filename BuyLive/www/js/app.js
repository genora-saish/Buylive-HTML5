var app_folder = "BuyLive";
var aws_cloud_front_url = "http://d1pk8m5pkfnhxe.cloudfront.net";
var s3_bucket_uri = "http://buylivemobile.s3.amazonaws.com/";

function getStates(country){
    console.log("into getStates..."+country);
    switch (country){
        case "USA":
            var states = {
                "AL": "Alabama",
                "AK": "Alaska",
                "AS": "American Samoa",
                "AZ": "Arizona",
                "AR": "Arkansas",
                "CA": "California",
                "CO": "Colorado",
                "CT": "Connecticut",
                "DE": "Delaware",
                "DC": "District Of Columbia",
                "FM": "Federated States Of Micronesia",
                "FL": "Florida",
                "GA": "Georgia",
                "GU": "Guam",
                "HI": "Hawaii",
                "ID": "Idaho",
                "IL": "Illinois",
                "IN": "Indiana",
                "IA": "Iowa",
                "KS": "Kansas",
                "KY": "Kentucky",
                "LA": "Louisiana",
                "ME": "Maine",
                "MH": "Marshall Islands",
                "MD": "Maryland",
                "MA": "Massachusetts",
                "MI": "Michigan",
                "MN": "Minnesota",
                "MS": "Mississippi",
                "MO": "Missouri",
                "MT": "Montana",
                "NE": "Nebraska",
                "NV": "Nevada",
                "NH": "New Hampshire",
                "NJ": "New Jersey",
                "NM": "New Mexico",
                "NY": "New York",
                "NC": "North Carolina",
                "ND": "North Dakota",
                "MP": "Northern Mariana Islands",
                "OH": "Ohio",
                "OK": "Oklahoma",
                "OR": "Oregon",
                "PW": "Palau",
                "PA": "Pennsylvania",
                "PR": "Puerto Rico",
                "RI": "Rhode Island",
                "SC": "South Carolina",
                "SD": "South Dakota",
                "TN": "Tennessee",
                "TX": "Texas",
                "UT": "Utah",
                "VT": "Vermont",
                "VI": "Virgin Islands",
                "VA": "Virginia",
                "WA": "Washington",
                "WV": "West Virginia",
                "WI": "Wisconsin",
                "WY": "Wyoming"
            };
            return states;
            break;
        case "Canada":
            var states = {
                "AB":"Alberta",
                "BC":"British Columbia",
                "MB":"Manitoba",
                "NB":"New Brunswick",
                "NL":"Newfoundland and Labrador",
                "NS":"Nova Scotia",
                "ON":"Ontario",
                "PE":"Prince Edward Island",
                "QC":"Quebec",
                "SK":"Saskatchewan",
                "NT":"Northwest Territories",
                "NU":"Nunavut",
                "YT":"Yukon"
            };
            return states;
            break;          
            
        }
}

function imgLoadErr(errCode,id){
    switch(errCode){
		case 0:
                    
                    
                break;
        }
    
}