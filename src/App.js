import SmartForm from './lib';

function App() {
  let template = {
		layout: { column: 2, spacing: 2, size: 'medium', label: 'top', type: 'flex' },
		title: 'Upload Form',
		description: 'Form for applying Job',
		sections: [
			{
				layout: { column: 2, spacing: 2, size: 'small', label: 'top', type: 'flex' },
				id: 'personal_information',
				fields: [
					{
						type: 'text',
						name: 'folderName',
						id: 'folderName',
						title: 'Folder Name',
						pattern: {
							value: /[A-Za-z]{3}/,
							message: "Invalid text"
						},
						validationProps: {
							required: "required"
						},
						style: {
							minWidth: '200px'
						}
					},
					{
						type: 'text',
						name: 'perName',
						id: 'perName',
						title: 'Per Name',
						validationProps: {
							required: 'This is a mandatory field'
						}
					},
					{
						type: 'date',
						name: 'fromDate',
						id: 'fromDate',
						title: 'From Date',
						unregister: ['save'],
						validationProps: {
							required: "required",
							validate: [
								{
									condition: "fromDate < toDate",
									message: "Value should not be greater than To date."
								}
							]
						}
					},
					{
						type: 'date',
						name: 'toDate',
						id: 'toDate',
						title: 'To Date',
						unregister: ['save'],
						validationProps: {
							required: "required",
							validate: [{
								condition: "toDate > fromDate",
								message: "Value should not be greater than From date."
							}]
						}
					}
				]
			}
		]
	}
  return (
    <SmartForm
      // defaultValues={usdata}
      template={template}
      // watchFields={['firstname', 'include_portfolio', 'email', 'country']}
      // validate={validate}
      onSubmit={data=>console.log(data)}
      buttons={['search']}
    />
  );
}

export default App;
