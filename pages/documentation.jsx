import styles from "./styles.module.css";

const Documentation = () => {
  return (
    <div className={styles.documentation}>
      <h1>UnBlockChat</h1>
      <p>
        Welcome to the documentation for UnBlockChat. This page will help you
        get started using the app and provide you with tips and examples for its
        main features.
      </p>

      <section className={styles.feature}>
        <h2>Discover Component</h2>
        <p>
          The Discover Component allows you to explore different examples and
          test out the functionality of the app. To access this feature, click
          on the Discover icon in the top navigation bar.
        </p>
        <p>Here are some tips for using the Discover Component:</p>
        <ul>
          <li>
            Tip 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </li>
          <li>
            Tip 2: Sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua.
          </li>
          <li>
            Tip 3: Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat.
          </li>
        </ul>
      </section>

      <section className={styles.feature}>
        <h2>External Link</h2>
        <p>
          The External Link feature allows you to access external resources
          related to the app. To access this feature, click on the External Link
          icon in the top navigation bar.
        </p>
        <p>Here are some tips for using the External Link feature:</p>
        <ul>
          <li>
            Tip 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </li>
          <li>
            Tip 2: Sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua.
          </li>
          <li>
            Tip 3: Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat.
          </li>
        </ul>
      </section>

      <section className={styles.feature}>
        <h2>Address From and To</h2>
        <p>
          The Address From and To feature allows you to specify addresses for
          different transactions within the app. To use this feature, simply
          enter the address information in the designated fields.
        </p>
        <p>Here are some tips for using the Address From and To feature:</p>
        <ul>
          <li>
            Tip 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </li>
          <li>
            Tip 2: Sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua.
          </li>
          <li>
            Tip 3: Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Documentation;
