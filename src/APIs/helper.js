class Helper {
  static baseURL() {
    return "https://api.foursquare.com/v2"
  }
  static auth() {
    const keys = {
      client_id: "ONRGIIUWGL2WZVDB3FXEL00BHIO2T5GHAU4ADYYDZ45YEZAZ",
      client_secret: "44MLSIX3ZBQTLKTX4043XZWISQCP4RZNPY0ZXGYPFQLZ40SA",
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
