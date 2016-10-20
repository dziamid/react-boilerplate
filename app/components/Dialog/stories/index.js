import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Dialog from '../index';
import Button from 'components/Button';

const cancel = <Button label="Cancel" />;
const submit = <Button label="Submit" primary />;
const ok = <Button label="OK" primary />;

storiesOf('Dialog', module)
  .add('confirmation dialog', () => (
    <Dialog title="Confirmation" actions={[ok]} open>
      Can be closed with ESC or outside click
    </Dialog>
  ))
  .add('modal dialog', () => (
    <Dialog title="Modal dialog" actions={[cancel, submit]} modal open>
      Can be closed by only using dialog actions
    </Dialog>
  ));
