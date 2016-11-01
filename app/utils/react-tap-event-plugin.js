import injectTapEventPlugin from 'react-tap-event-plugin';

export default function injectTapEvent() {
  try {
    injectTapEventPlugin();
  } catch (err) {
    console.log('Surpressed injectTapEventPlugin error');
  }
}

