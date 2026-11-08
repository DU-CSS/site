namespace Ducss.Api.Members;

public class MemberSyncRequest
{
    public List<MemberSyncRecord> Members { get; set; } = new();
}

public class MemberSyncRecord
{
    public string FirstName { get; set; } = "";
    public string LastName { get; set; } = "";
    public string Email { get; set; } = "";
    public DateOnly? DateJoined { get; set; }
}