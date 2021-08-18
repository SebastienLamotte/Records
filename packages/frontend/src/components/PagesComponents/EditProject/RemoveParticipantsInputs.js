import { useSelector } from 'react-redux';
import { FieldArray } from 'formik';

import Input from '../../Form/Input';

import styles from './RemoveParticipantsInputs.module.css';

export default function RemoveParticipantsInputs({
  participantsUsers,
  setFieldValue,
  values,
}) {
  const participants = [...participantsUsers];
  const userId = useSelector((state) => state.auth.userId);
  const indexUser = participants.findIndex(
    (participant) => participant._id === userId
  );
  participants.splice(indexUser, 1);

  return (
    <FieldArray
      name="partnersToRemove"
      render={(arrayHelpers) => (
        <div>
          <p className={styles.title}>Delete Partner(s)</p>
          <ul className={`${styles.remove}`} role="group">
            {participants.map((participant, id) => (
              <li key={id}>
                <Input
                  name="partnersToRemove"
                  label={participant.username}
                  checked={values.partnersToRemove.includes(
                    participant.username
                  )}
                  onChange={(e) => {
                    const partnerIdsToRemove = values.partnerIdsToRemove;
                    if (e.target.checked) {
                      arrayHelpers.push(participant.username);
                      partnerIdsToRemove.push(participant._id);
                    } else {
                      const PartnerIdsToRemoveindex =
                        values.partnerIdsToRemove.indexOf(participant._id);
                      partnerIdsToRemove.splice(PartnerIdsToRemoveindex, 1);

                      const idx = values.partnersToRemove.indexOf(
                        participant.username
                      );
                      arrayHelpers.remove(idx);
                    }
                    setFieldValue('partnerIdsToRemove', partnerIdsToRemove);
                  }}
                  control="checkbox"
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    />
  );
}
