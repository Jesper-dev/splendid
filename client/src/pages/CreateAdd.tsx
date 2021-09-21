import { Form } from "../components/Form";
import { MainBtn } from "../components/MainBtn";

const CreateAdd = () => {
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit");
  };
  return (
    <>
      <div className="addFormContainer">
        <Form
          submitFunc={submit}
          values={{
            category: "1. Kategori",
            desc: "2. Beskriv varan",
            pic: "3. Bilder",
            price: "4. Pris",
            options: "5. Alternativ för upphämtning",
            terms: "6. Villkor",
            value: "7. Värde",
          }}
        >
          {(values) => (
            <>
              <label>{values.category}</label>
              <input placeholder="Kategori" type="text"></input>

              <label>{values.desc}</label>
              <input placeholder="Rubrik" type="text" id="inputDescTitle" />
              <textarea placeholder="Beskrivning" name=""></textarea>

              <label>{values.pic}</label>
              <input type="text"></input>

              <label>{values.price}</label>
              <input placeholder="Pris för en dag" type="text" />
              <input placeholder="Pris för 3 dagar" type="text" />
              <input placeholder="Pris för en vecka" type="text" />

              <label>{values.options}</label>
              <div className="optionsContainer">
                <div>
                  <input type="checkbox"></input>
                  <span>Upphämtning</span>
                </div>
                <div>
                  <input type="checkbox"></input>
                  <span>Leverans</span>
                </div>
                <p>
                  Splendid erbjuder användare ett miljövänligt
                  leveransalternativ för att göra lånadet mer tillgänligt för de
                  som saknar möjligheter för upphämtning. Se hur vi arbetar
                  genom att följa länken.
                </p>
              </div>

              <label>{values.terms}</label>
              <input placeholder="Villkor" type="text" />

              <label>{values.value}</label>
              <input placeholder="Värde" type="text" />

              <MainBtn text={"publicera annons"} />
            </>
          )}
        </Form>
      </div>
    </>
  );
};

export default CreateAdd;
