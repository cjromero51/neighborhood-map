class Helper {
  static baseURL() {
    return "https://api.foursquare.com/v2"
  }
  static auth() {
    const keys = {
      client_id: "GGILFX5DNYX4U4X5LOQRTQJJRBNMKC45LFX0ZPXN2D0IL3RE",
      client_secret: "2IAIBAJ20H0ZOQEUVGN100W4DBGVYNXIMCA5D0TSUZIDB4PC",
      v: "20181029"
    }
    return Object.keys(keys).map(key => `${key}=${keys[key]}`).join('&');
  }
  static headers() {
    return {
      Accept: 'application/json'
    }
  }
  static urlString(params) {
    if (!params) {
      return ''
    }
    return Object.keys(params).map(key => `${key}=${params[key]}`).join('&');
  }
  static myFetch(endpoint,method,params) {
    let getData = {
      method,
      headers: Helper.headers()
    }
    return fetch(`${Helper.baseURL()}${endpoint}?${Helper.auth()}&${Helper.urlString(params)}`,
    getData)
    .then(res => res.json());
  }
}

export default class SearchAPI {
  static searchVenues(params) {
    return Helper.myFetch("/venues/search","GET",params);
  }
  static getVenueData(VENUE_ID) {
    return Helper.myFetch(`/venues/${VENUE_ID}`,"GET")
  }
  static getVenuePhotos(VENUE_ID) {
    return Helper.myFetch(`/venues/${VENUE_ID}/photos`,"GET")
  }
}
