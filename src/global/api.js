import { ajax } from 'rxjs/ajax';
import { endpoints } from './endpoints';

export const getIssues = () =>
  ajax.getJSON(`${endpoints.BASE_URL}${endpoints.ISSUES}`);
