import richpapaRequest from "@/utils/richpapa-request";

export function getFeedBackList(query) {
  query.service = "Message.FeedbackList";
  return richpapaRequest({
    method: "get",
    params: query
  });
}

export function getTipOffsList(query) {
  query.service = "Message.TipoffList";
  return richpapaRequest({
    method: "get",
    params: query
  });
}

export function feedbackLetter(text, uid) {
  return richpapaRequest({
    method: "get",
    params: {
      service: "Message.FeedbackLetter",
      text,
      uid
    }
  });
}

export function tipoffHandtleUser(uid) {
  return richpapaRequest({
    method: "get",
    params: {
      service: "Message.TipoffHandleUser",
      uid
    }
  });
}

export function msgPush(form) {
  form.service = "Message.MsgPush";
  return richpapaRequest({
    method: "get",
    params: form
  });
}

/**
 * 修改`反馈`状态
 * @param {string} feedback_id 反馈表id
 */
export function setFeedbackHandle(feedback_id) {
  return richpapaRequest({
    method: "get",
    params: {
      service: "Message.FeedbackHandle",
      feedback_id
    }
  });
}

/**
 * 修改`反馈`状态
 * @param {string} tipoff_id 举报表id
 */
export function setTipoffHandle(tipoff_id) {
  return richpapaRequest({
    method: "get",
    params: {
      service: "Message.TipoffHandle",
      tipoff_id
    }
  });
}

export default {};
