export const getTabNumber = (type, urlService) => {

    // let urlService = 
    if (type === 'course_type') {
        let tabName = urlService.current.getValueFromEntry(type);
        switch (tabName) {
            case 'Certificate':
                return 0;
            case 'Diploma':
                return 1;
            case 'Degree':
                return 2;
            case 'Job Assured':
                return 3;
            default:
                return 4;
        }
    }
}