import {ChangeEvent, FormEvent, useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';

import {useApi} from '../context/api';
import {useAuth} from '../context/auth';
import {useUrl} from '../context/url';

export default function SignInForm(): JSX.Element {
  const [password, setPassword] = useState<string>("");
  const [remember, setRemember] = useState<boolean>(false);

  const [err, setErr] = useState<any>(undefined);
  const [passwordWrong, setPasswordWrong] = useState<boolean>(false);
  const [validated, setValidated] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const api = useApi();
  const auth = useAuth();
  const history = useHistory();
  const url = useUrl();

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleRememberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRemember(e.target.checked);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setPasswordWrong(false);
    setErr(undefined);
    setValidated(false);

    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    setSubmitting(true);

    api.sirius.signIn(password)
        .then(response => {
          if (response.status.toString()[0] === '2') {
            auth.signIn(response.data!.token, remember);
            history.push(url.adminUrl);
          } else {
            setSubmitting(false);
            setValidated(true);
            setPasswordWrong(true);
          }
        }, err => {
          setSubmitting(false);
          setValidated(true);
          setErr(err);
        });
  };

  // TODO: Solve inconsistency in the password input validation UI.
  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group controlId="password">
        <Form.Control
            type="password"
            placeholder="Password"
            required
            value={password}
            disabled={submitting}
            onChange={handlePasswordChange}
            isInvalid={passwordWrong || err} />
        <Form.Control.Feedback type="invalid">
          {passwordWrong ? 'Wrong password' :
              (err ? 'Failed to submit password' : 'Please input your password')}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="rememberMe">
        <Form.Check
            type="checkbox"
            label="Remember me"
            checked={remember}
            disabled={submitting}
            onChange={handleRememberChange} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Sign In
      </Button>
    </Form>
  );
}
