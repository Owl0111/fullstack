const PersonForm = ({ handleNameChange, handleNumberChange, handleSubmit, newName, newNumber }) => {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    Name:{" "}
                    <input
                        value={newName}
                        required
                        id="name"
                        onChange={handleNameChange}
                    />
                    Number:
                    <input
                        value={newNumber}
                        id="number"
                        required
                        onChange={handleNumberChange}
                    />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    );
}
export default PersonForm;