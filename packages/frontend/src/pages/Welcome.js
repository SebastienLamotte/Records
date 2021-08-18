import Card from '../components/UI/Card';

export default function Welcome() {
  return (
    <Card>
      <h1>Records</h1>
      <Card>
        <h2>Create your project</h2>
        <p>
          A project just need a title and a description to be created.
          <br />
          You can then add new records inside your project.
          <br />
          A Record also need a title and a description, with a starting time and
          an ending time. You can use the timer to simplify your life or
          manually fill the fields to, for instance, set an older time record.
          <br />
        </p>
        <h2>Share your project and work together</h2>
        <p>
          Once your project is created, you can share it with other users!
          <br />
          They can then add new time record as well in your project.
          <br />
          You can add and remove partner(s) to your project whenever you want.
          <br />
        </p>
      </Card>
    </Card>
  );
}
