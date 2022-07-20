
export default class UrlService {
    constructor(url){
        this.urlSearchParams = new URLSearchParams(url);
    }

    useQuery() {
        return this.urlSearchParams;
    }

    getEntries() {
        let entries = this.urlSearchParams.entries();
        let res = [];
        for(const values of entries){
            res.push(values[0]);
            res.push(values[1]);
        }
        return res;
    }

    removeEntry(entry) {
        this.urlSearchParams.delete(entry);

    }

    removeAll(){
        this.urlSearchParams = new URLSearchParams('');
    }

    hasEntry(entry){
        return this.urlSearchParams.has(entry);
    }

    hasValue(value){
        const index = this.getEntries().indexOf(value);
        return index === -1 ? false : index;
    }
    
    addEntry(entry, value){
        this.urlSearchParams.append(entry, value);
    }
    
    changeEntry(entry, value) {
        if(this.hasEntry(entry))
            this.removeEntry(entry);
        
        
        if (value === "All") return;
        this.addEntry(entry, value);

    }

    getUpdatedUrl() {
        let updatedUrl = this.urlSearchParams.toString();
        if (updatedUrl.includes('min_price=0&max_price=0')){
            updatedUrl = updatedUrl.replace('min_price=0&max_price=0', '');
        }
        return updatedUrl;
    }

    getValueFromEntry(entry) {
        return this.urlSearchParams.get(entry);
    }

}