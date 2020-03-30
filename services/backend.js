import { sendGet, sendPost } from 'services/BackendFactory';

export function fetchQuizzes (opts) {
  return sendGet({
    // resource: `api.php?amount=10&category=21&difficulty=medium&type=multiple`,
    resource: `quiz`,
    ...opts
  })
}

export function loginPOST (opts) {
  return sendPost({
    resource: `auth/login`,
    ...opts
  })
}
