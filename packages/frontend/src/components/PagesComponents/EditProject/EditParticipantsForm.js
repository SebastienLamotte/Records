import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import * as yup from 'yup';

import useHttp from '../../../hooks/use-http';
import { projectActions } from '../../../store/project-slice';

import Card from '../../UI/Card';
import Form from '../../Form/Form';
import AddParticipantsInputs from './AddParticipantsInputs';
import RemoveParticipantsInputs from './RemoveParticipantsInputs';

export default function EditParticipantForm({ participants, projectId }) {
  const [isUpdatingPartners, setIsUpdatingPartners] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const httpRequest = useHttp();
  const dispatch = useDispatch();
  const history = useHistory();
  const { url } = useRouteMatch();

  const showUpdatePartnerHandler = async () => {
    if (!isUpdatingPartners) {
      setIsUpdatingPartners(true);
      const formattedResponse = await httpRequest({
        urlPath: `/auth/list-potential-participants?exclude=${participants.map(
          (participant) => participant._id
        )}`,
      });
      const users = formattedResponse.users.sort((userA, userB) =>
        userA.username.localeCompare(userB.username)
      );
      setUsersList(users.length === 0 ? null : users);
    }
  };

  return (
    <Card>
      {isUpdatingPartners ? (
        <Form
          title="Update partner(s)"
          setInputs={({ setFieldValue, setFieldTouched, values, errors }) => [
            <AddParticipantsInputs
              key="add_participant"
              usersList={usersList}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              errors={errors}
            />,
            participants.length > 1 && (
              <RemoveParticipantsInputs
                key="remove_participant"
                participantsUsers={participants}
                setFieldValue={setFieldValue}
                values={values}
              />
            ),
          ]}
          submitBtnValue="Update Partner(s)"
          initialValues={{
            newPartner: '',
            newPartnerId: '',
            partnersToRemove: [],
            partnerIdsToRemove: [],
            projectId,
          }}
          validationSchema={yup.object({
            newPartner: yup
              .string()
              .min(4, 'Must be at least 4 characters.')
              .max(20, 'Must be at most 20 characters.')
              .test({
                name: 'Partner must be a user',
                message: 'Not an existing user or already part of the project.',
                test: (newPartner) =>
                  newPartner && usersList
                    ? usersList.some((user) => user.username === newPartner)
                    : true,
              }),
          })}
          httpParams={{
            urlPath: '/participant/edit',
            method: 'PUT',
          }}
          statusCodeAction={{
            statusCode: 200,
            action: ({ participantAdded, participantsDeleted }) => {
              participantAdded &&
                dispatch(
                  projectActions.addParticipant({
                    projectId,
                    participant: participantAdded,
                  })
                );
              participantsDeleted &&
                dispatch(
                  projectActions.deleteParticipants({
                    projectId,
                    idsToDelete: participantsDeleted,
                  })
                );
              history.push(url.replace('/edit', ''));
            },
          }}
        />
      ) : (
        <div className="centered">
          <button onClick={showUpdatePartnerHandler} className="btn btn-small">
            Update Partner(s)
          </button>
        </div>
      )}
    </Card>
  );
}
