export function mapToToastrMessage(type, array) {
  const obj = {};
  obj.type = type;

  obj.options = array.filter(item => typeof item === 'object')[0] || {};

  if (!obj.options.icon) {
    obj.options.icon = mapToIcon(type);
  }


  if (!{}.hasOwnProperty.call(obj.options, 'removeOnHover')) {
    obj.options.removeOnHover = true;
  }

  if (!{}.hasOwnProperty.call(obj.options, 'showCloseButton')) {
    obj.options.showCloseButton = true;
  }

  if (isString(array[0]) && isString(array[1])) {
    obj.title = array[0];
    obj.message = array[1];
  } else if (isString(array[0]) && !isString(array[1])) {
    obj.title = array[0];
  } else {
    obj.message = array[0];
  }

  return obj;
}

export function mapToIcon(type) {
  switch (type) {
    case 'info':
      return 'toastr-icon-information-circle';
    case 'success':
      return 'toastr-icon-check-1';
    case 'warning':
      return 'toastr-icon-exclamation-triangle';
    case 'error':
      return 'toastr-icon-exclamation-alert';
    default:
      return type;
  }
}

function isString(obj) {
  return typeof obj === 'string';
}
