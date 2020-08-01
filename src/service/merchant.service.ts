import Constant from '../constant/constant';
import WebReqUrl from '../web-req/web-req';
import apiUrl from '../apicontroller/apicontrollers';

export default {
    addMerchant: async function (data: any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.merchantController.addMerchant, data);
    },
    addMerchantBusiness: async function (data: any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.merchantBusinessController.addMerchantBusiness, data);
    },
    addMerchantReview: async function (data: any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.merchantReviewController.addMerchantReview, data);
    }
}