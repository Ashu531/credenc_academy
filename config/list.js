import Strings from "./strings"

export default class Lists {
    static filters = {
        CLASS_MODE: 0,
        COURSE_PACE: 1,
        COST: 2,
        DIFFICULTY_LEVEL: 3,
        WORK_EXPERIENCE: 4,
        FINANCE_OPTIONS: 5,
        COURSE_LANGUAGE: 6,
    }

    static ProfileDropList = [
        {id: 0, value: Strings.PROFILE_SETTINGS},
        // // {id: 1, value: Strings.INVITE_FRIEND},
        // {id: 3, value: Strings.MY_REVIEWS},
        // {id: 4, value: Strings.MY_UPVOTES},
        // {id: 2, value: Strings.PRIVACY_POLICY},
        {id: 1, value: Strings.LOGOUT},
    ]

    static classModes = [
        {name: 'Online Live', filterValue: 'Online Live', isApplied: false},
        {name: 'Online Recorded', filterValue: 'Online Recorded', isApplied: false},
        {name: 'On Campus', filterValue: 'On Campus', isApplied: false},
    ]

    static coursePaceList = [
        {name: 'Self Paced', filterValue: 'Self Paced', isApplied: false},
        {name: 'Part Time', filterValue: 'Part Time', isApplied: false},
        {name: 'Full Time', filterValue: 'Full Time', isApplied: false},
    ]

    static difficultyList = [
        {name: 'Beginner', filterValue: 'Beginner', isApplied: false},
        {name: 'Intermediate', filterValue: 'Intermediate', isApplied: false},
        {name: 'Advance', filterValue: 'Advance', isApplied: false},
    ]

    static workExperiences = [
        {name: 'Student', filterValue: 'Student', isApplied: false},
        // {name: 'Fresher', filterValue: 'Fresher', isApplied: false},
        {name: 'Entry Level', filterValue: 'Entry Level', isApplied: false},
        {name: 'Senior Level', filterValue: 'Senior Level', isApplied: false},
        {name: 'Leadership', filterValue: 'Leadership', isApplied: false},
    ]

    static costList = [
        {name: 'Free', filterValue: 'Free', isApplied: false},
        {name: 'Partially Free', filterValue: 'Partially Free', isApplied: false},
        {name: 'Paid', filterValue: 'Fully Paid', isApplied: false},
    ]

    static financeOptions = [
        {name: 'One Time Pay', filterValue: 'lumpsum', isApplied: false},
        {name: 'Subscription', filterValue: 'subscription', isApplied: false},
        {name: 'Pay After Placement', filterValue: 'pay_after_placement', isApplied: false},
        {name: 'No Cost EMI', filterValue: 'no_cost_emi', isApplied: false},
        {name: 'Installment', filterValue: 'installment', isApplied: false},
    ]

    static languages = [
        {name: 'English', filterValue: 'English', isApplied: false},
        {name: 'Hindi', filterValue: 'Hindi', isApplied: false},
    ]

    static sortByList = [
        {id: 0, name: 'Most Relevant', filterValue: 'sort_by_relevance'},
        {id: 1, name: 'Most Upvoted', filterValue: 'sort_by_upvotes'},
        {id: 2, name: 'Price: High to Low', filterValue: 'sort_by_price_high'},
        {id: 3, name: 'Price: Low to High', filterValue: 'sort_by_price_low'},
        // {id: 4, name: 'Sort by Rating'},
    ]

    static errorTypes = {
        EMPTY: 0,
        CRASH: 1,
    }

    static courseTypesFloatList = [
        {id: 0, name: 'Certificate', filterValue: 'Certificate'},
        {id: 1, name: 'Diploma', filterValue: 'Diploma'},
        {id: 2, name: 'Degree', filterValue: 'Degree'},
        {id: 3, name: 'Job Assured', filterValue: 'Job Assured'},
        {id: 4, name: 'All', filterValue: 'All'},
        // {id: 4, name: 'Sort by Rating'},
    ]

    static courseTypes = ['Certificate', 'Diploma', 'Degree', 'Job Assured', 'All'];

    static genderTypes= ['Male','Female','Others']
}