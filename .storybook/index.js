
const context = require.context('../app', true, /[\w\/]+stories\/.+?\.js$/);
context.keys().forEach(context);