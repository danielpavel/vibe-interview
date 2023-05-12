import { Snackbar, Alert, SnackbarOrigin } from '@mui/material';
import Slide, { SlideProps } from '@mui/material/Slide';
import { AlertState } from '@/types/types';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  alertStateProps?: AlertState | any,
  setAlertStateFunc?: Dispatch<SetStateAction<AlertState>>,
}

const topCenterSnackBarOrigin: SnackbarOrigin = {
  vertical: 'top',
  horizontal: 'center'
}

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="down" />;
}


const SnackBar: React.FC<Props> = ({ alertStateProps, setAlertStateFunc }) => {
  return (
    <Snackbar
      open={alertStateProps.open}
      anchorOrigin={topCenterSnackBarOrigin}
      autoHideDuration={
        alertStateProps.hideDuration === undefined ? 6000 : alertStateProps.hideDuration
      }
      onClose={() => setAlertStateFunc!({ ...alertStateProps, open: false })}
      TransitionComponent={SlideTransition}
    >
      <Alert
        onClose={() => setAlertStateFunc!({ ...alertStateProps, open: false })}
        severity={alertStateProps.severity}
        elevation={6}
        variant="filled"
      >
        {alertStateProps.message}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar