import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/lib/Button'
import Panel from 'react-bootstrap/lib/Panel'
import JSONInput from 'react-json-editor-ajrm/index';
import locale from 'react-json-editor-ajrm/locale/en';

import RecordDialog from './RecordDialog';
import { getRecordFromAPI, setRecord } from '../store/actions/record';

function RecordDetails({ val }) {
  const [open, setOpen] = useState(false);

  const { type } = useParams();
  const dispatch = useDispatch();
  const { record } = useSelector(state => state.record);
  const { recordTypes } = useSelector(state => state.recordType);

  const fetchRecord = useCallback(() => { 
    if (val) {
      if (type === 'privcloud') {
        dispatch(getRecordFromAPI(val));
      } else {
        dispatch(setRecord({ guid: val }));
      }
    }
  }, [val, type]);

  useEffect(() => {
    fetchRecord();
  }, [fetchRecord]);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  if (!record)
    return (<p>Loading Data</p>)

  return (
    <div className="customerdetails">
      <Panel bsStyle="info">
        <Panel.Heading>
          <Panel.Title componentClass="h3">Record Details: {record.guid}</Panel.Title>
        </Panel.Heading>
        <Panel.Body style={{ textAlign: 'left' }}>
          <p>Guid : {record.guid}</p>
          <p>Record Type : {recordTypes.find((recordType) => recordType.id === record.record_type_id).name}</p>
          <p>Tags : {record.tags.map(({ tag }) => tag).join(', ')}</p>
          <JSONInput
            placeholder={record.record}
            locale={locale}
            colors={{
              string: '#DAA520', // overrides theme colors with whatever color value you want
            }}
            height="400px"
            width="100%"
            viewOnly
          />
        </Panel.Body>
        <Panel.Footer style={{ textAlign: 'right' }} onClick={handleOpen}>
          <Button bsStyle="info">Edit Record</Button>
        </Panel.Footer>
      </Panel>
      {open && (
        <RecordDialog open={open} guid={val} onClose={handleClose} />
      )}
    </div>
  )
}

export default RecordDetails;
