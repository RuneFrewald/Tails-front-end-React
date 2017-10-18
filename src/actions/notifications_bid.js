import apiService from '../lib/api'
import { GET_NOTIFICATION_BIDS, GET_NOTIFICATION_BIDS_UPDATE } from '../config/actionTypes'

export function getNotification (filter) {
  console.log('filter',filter)
  let bids;
  return function (dispatch) {
    return apiService.find('bids', filter).then(res => {
      bids = res.data.filter(items => items.details.approved_by_bidder != true);
      //let bids = res.data;

      console.log('======================================')
      console.log('bids',bids)

      let listing_ids = bids.map(listing => listing.listing_id);
      return apiService.find('listings', {
        filter: {
          id: {
            in: listing_ids.join()
          }
        },
        include: ['user']
      })
    }).then(res => {
      let listings = res.data.map(listing => {
        listing.my_bid = bids.filter(bid => bid.listing_id == listing.id);
        console.log(listing)
        return listing;
      })
      dispatch({type: GET_NOTIFICATION_BIDS, bids: listings })
    })
      .catch(error => {
        console.log('getBids err', error)
      })
  }
}

export function approveBid (id) {

  return function (dispatch) {
    return apiService.post('bids/' + id + '/approve', {}).then(res => {
      console.log('approve', res)
      dispatch({type: GET_NOTIFICATION_BIDS_UPDATE, result: {bid: res, id} })
    }).catch(error => {
        console.log('getBids err', error)
      })
  }
}