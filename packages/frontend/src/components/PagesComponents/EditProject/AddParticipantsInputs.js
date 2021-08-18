import { Fragment } from 'react';

import Input from '../../Form/Input';

export default function AddParticipantsInputs({
  usersList,
  setFieldValue,
  setFieldTouched,
  errors,
}) {
  return (
    <Fragment>
      <span key="error_form" className="centered has-error">
        {errors.partnerToRemove}
      </span>
      <div className="centered">
        {usersList ? (
          <Input
            name="newPartner"
            control="datalist"
            label="New Partner"
            onChange={(setDatalist, event) => {
              const { value } = event.target;
              const partner = usersList.find((user) => user.username === value);
              partner && setFieldValue('newPartnerId', partner._id);
              setFieldTouched('newPartner', !!value && !partner);
              setFieldValue('newPartner', value);
              setDatalist(
                value.length > 3 ? usersList.map((user) => user.username) : []
              );
            }}
          />
        ) : (
          <Fragment>
            <div>All users are participating to this project</div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
}
