export const getTabNumber = (type, urlService) => {

    // let urlService = 
    if (type === 'course_type') {
        let tabName = urlService.current.getValueFromEntry(type);
        switch (tabName) {
            case 'Certificate':
                return 1;
            case 'Diploma':
                return 2;
            case 'Degree':
                return 3;
            case 'Job Assured':
                return 4;
            default:
                return 0;
        }
    }
}