import axios from 'axios'

const Axios = axios.create({
    baseURL: 'https://api.prod.online.risee.in/index.php/rest/'
})

//const API_URL = {
//
//    // Test Server
//    BASE_URL : 'https://api.test.takengo.risee.in/index.php/rest',
//    IMG_URL  : 'https://api.test.takengo.risee.in/uploads/',
//
//    // Production Server
//    //BASE_URL      : 'https://api.prod.online.risee.in/index.php/rest',
//    //IMG_URL       : 'https://api.prod.online.risee.in/uploads/',
//}

export default Axios