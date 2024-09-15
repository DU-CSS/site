<div class="explainer">
    If you would like to get in touch with DUCSS about any concerns or queries, please use the form provided below.
    <br/> <br/>
    If you are attempting to get in touch about sponsoring the society, please note the following non-exhaustive 
    list of industries we are unwilling to partner with: <p class="blacklist">crypto, gambling, oil & gas</p>.
    <br/><br/>
    It may take a few days for us to get back to you, as we are all volunteers, but we will do our best :)
</div>

<div class="container">
    <form action="https://formsubmit.co/ducss@csc.tcd.ie" method="POST">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required>

        <label for="subject">Subject</label>
        <input type="text" id="subject" name="_subject" required>

        <label for="message">Message</label>
        <textarea name="message" id="message" placeholder="How can we help?" required></textarea>

        <input type="hidden" name="_autoresponse" value="We have received your message, and will review it ASAP!">
        
        <div class="button-container">
            <button type="submit">Send</button>
        </div>
    </form>
</div>

<style>

    * {
        color: hsl(207, 12%, 43%);
        font-weight: 500;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 16px;
        text-decoration: none;
    }

    .explainer {
        color: hsl(209, 15%, 28%);
        max-width: 1000px;
        margin: 0 auto;
        margin-bottom: 25px;
        text-align: justify;

        padding-left: 15px;
        padding-right: 15px;
    }

    .blacklist {
        display: inline;
        color: red;
        font-weight: 700;
    }

    input[type=text], input[type=email], textarea {
      width: 100%;
      padding: 12px;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
      margin-top: 6px;
      margin-bottom: 16px;
      resize: vertical;

      background-color: hsl(25, 100%, 97%);
    }

    textarea::placeholder {
        opacity: .5;
    }

    button[type=submit] {
        background-color: hsl(15, 95%, 58%);
        color: hsl(240, 100%, 99%);
        padding: 12px 20px;
        border: none;
        border-radius: 10px;
        cursor: pointer;    
        width: 150px;
        height: 50px;

        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.10);
		transition: box-shadow 750ms ease-in-out;
    }

    button[type=submit]:hover {
        box-shadow: 0 15px 25px rgba(0, 0, 0, 0.15), 0 5px 10px rgba(0, 0, 0, 0.5);
    }

    .container {
        display: flex;
        flex-direction: column;

        border-radius: 15px;
        background-color: hsl(180, 100%, 97%);
        padding: 20px;
        max-width: 1000px;
        min-height: 50vh;
        margin: 0 auto;

        border: 2.5px solid hsl(15, 95%, 58%);
    }

    form {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }

    .button-container {
        display: flex;
        flex-grow: 1;

        justify-content: center;
        align-items: center;
    }

</style>