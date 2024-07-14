const newContact = (props) => {
    const {onSubmit,inValue,handleInChange,inNumberValue,handleNumberValue}=props
  
    return (
    <>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name : </label>
        <input
          value={inValue}
          type="text"
          id="name"
          onChange={handleInChange}
        />
        <label htmlFor="number">Number : </label>
        <input value={inNumberValue} onChange={handleNumberValue} />
        <br />
        <button type="submit">add</button>
      </form>
      ;
    </>
  );
};

export default newContact;
