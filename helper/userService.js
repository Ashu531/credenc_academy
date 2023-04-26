import axios from "axios"

const getDataFromUrl = async (url, token, apiStatus) => {
    if(apiStatus){
        apiStatus.current.makeApiCall();
    }
    const res = await axios.get(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(res => {
        if(apiStatus){
            apiStatus.current.success();
        }
        return res;
        
    })
    .catch(err => {
        if(apiStatus){
            apiStatus.current.failed();
        }
        console.log(err);
    });

    return res ? res.data : [];
}

const getUserData = async (url, token) => {
    const upvotes = getDataFromUrl(`${url}/userupvotes/`, token);
    const reviews = getDataFromUrl(`${url}/userreviews/`, token);
    const bookmarks = getDataFromUrl(`${url}/batch/bookmark/`, token);

    upvotes = await upvotes;
    reviews = await reviews;
    bookmarks = await bookmarks;

    return { upvotes, reviews, bookmarks };
}

const getUserInitials = (value) => {
    if(value && value[0].lenght > 0){
        return value[0];
    }else{
        return 'YN'
    }
    
}


export {
    getUserData,
    getDataFromUrl,
    getUserInitials,
}