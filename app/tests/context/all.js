import intl from './intl';
import store from './store';
import theme from './theme';

const all = (children) => intl(store(theme(children)));

export default all;
