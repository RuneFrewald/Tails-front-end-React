import {checkHttpStatus, parseJSON} from '../http.js'
const isPlainObject = require('lodash.isplainobject');

function objToQueryString(obj) {
    return Object.keys(obj).map(function(key) {
      return encodeURIComponent(key) + '=' +
        encodeURIComponent(obj[key]);
    }).join('&');
}

function objAPIToQueryString(obj) {
    let resObj = {};
    if (isPlainObject(obj.filter)){
      Object.keys(obj.filter).forEach((attr) => {
        if (isPlainObject(obj.filter[attr])){
          Object.keys(obj.filter[attr]).forEach((op) => {
              resObj[ `filter[${attr}][${op}]` ] = obj.filter[attr][op];
          });
        } else {
          resObj[ `filter[${attr}]` ] = obj.filter[attr];
        }
      })
    }
    if (Array.isArray(obj.include)){
      resObj[ `include` ] = obj.include.join(',');
    }
    if (isPlainObject(obj.sort)){
      let sortArr = [];
      Object.keys(obj.sort).forEach((attr) => {
        sortArr.push( ((obj.sort[attr] != 1) ? '-' : '') + attr);
      })
      resObj[ `sort` ] = sortArr.join(',');
    }
    if (isPlainObject(obj.page)){
      if (typeof obj.page.number !== "undefined"){
        resObj[ `page[number]` ] = obj.page.number;
      }
      if (typeof obj.page.size !== "undefined"){
        resObj[ `page[size]` ] = obj.page.size;
      }
    }
    if (typeof obj.skip === 'numeric' && typeof obj.limit === 'numeric' && obj.limit > 0){
      resObj[ `page[size]` ] = obj.page.limit;
      resObj[ `page[number]` ] = Math.floor(obj.skip / obj.page.limit) + 1;
    }
    Object.keys(obj).forEach((attr) => {
      if (['filter', 'include', 'sort', 'page', 'skip', 'limit'].indexOf(attr) < 0){
        resObj[ attr ] = obj[attr].toString();
      }
    });

    return objToQueryString(resObj);
}

export default {
  headers: {},
  baseUrl: '',

  config({headers, baseUrl, addHeaders}){
    if (headers) {
      this.headers = headers;
    }
    if (addHeaders) {
      this.headers = Object.assign({}, this.headers, addHeaders);
    }
    if (baseUrl){
      this.baseUrl = baseUrl;
    }
  },

  request({url, baseUrl, path, query, method, headers, bodyJSObject}){
    let urlFetch = url ? url : (baseUrl ? baseUrl : this.baseUrl) + path;
    if (query) {
      urlFetch += '?'+query;
    }
    return fetch(urlFetch,
      {
        method: method || "GET",
        headers: Object.assign({}, this.headers, headers),
        body: bodyJSObject ? JSON.stringify(bodyJSObject) : undefined
    }).then(checkHttpStatus).then(parseJSON);
  },

  get(model, idOrPath, query){
    let realPath = '';
    realPath = '/'+model+'/'+idOrPath;
    return this.request({
      path: realPath,
      query: (_.isPlainObject(query)) ? objAPIToQueryString(query) : _.isString(query) ? query : undefined,
      method: 'get'
    });
  },

  post(model, dataOrAction, data = null){
    let realPath = '';
    let realData = null;
    if (data) {
      realPath = '/'+model+'/'+dataOrAction;
      realData = data;
    } else {
      realPath = '/'+model;
      realData = dataOrAction;
    }
    return this.request({path: realPath, method: 'post', bodyJSObject: realData});
  },

  put(model, idOrPath, data = null){
    let realPath = '';
    realPath = '/'+model+'/'+idOrPath;
    return this.request({path: realPath, method: 'put', bodyJSObject: data});
  },

  put_not_id(model, data = null){
    let realPath = '';
    realPath = '/'+model;
    return this.request({path: realPath, method: 'put', bodyJSObject: data});
  },

  delete(model, idOrPath){
    let realPath = '';
    realPath = '/'+model+'/'+idOrPath;
    return this.request({
      path: realPath,
      method: 'delete'
    });
  },

  find(model, query){
    let realPath = '';
    realPath = '/'+model;
    return this.request({
      path: realPath,
      query: (_.isPlainObject(query)) ? objAPIToQueryString(query) : _.isString(query) ? query : undefined,
      method: 'get'
    });
  },

  findOne(model, id, query){
    let realPath = '';
    realPath = '/'+model + '/' + id;
    return this.request({
      path: realPath,
      query: (_.isPlainObject(query)) ? objAPIToQueryString(query) : _.isString(query) ? query : undefined,
      method: 'get'});
  },

  create(model, data){
    return this.post(model, data);
  },

  update(model, id, data){
    return this.put(model, id, data);
  },

  remove(model, id){
    return this.delete(model, id);
  },

}
