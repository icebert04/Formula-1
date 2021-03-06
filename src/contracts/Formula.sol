pragma solidity ^0.5.0;

contract Formula {
  string public name = "Formula";
  uint public imageCount = 0;
  mapping(uint => Image) public images;
  
  struct Image {
   uint id;
   string hash;
   string description;
   uint tipAmount;
   address payable author; 
  }

   event ImageCreated (
   uint id,
   string hash,
   string description,
   uint tipAmount,
   address payable author
  );

  event ImageTipped(
    uint id,
    string hash,
    string description,
    uint tipAmount,
    address payable author
  );

    constructor() public {
    name = "Formula";
  }

  function uploadImage(string memory _imageHash, string memory _description) public {
    // Make sure the image hash exists
    require(bytes(_imageHash).length > 0);
    // Make sure image description exists
    require(bytes(_description).length > 0);
    // Make sure uploader address exists
    require(msg.sender!= address(0));

    imageCount ++;

    images[imageCount] = Image(imageCount, _imageHash, _description, 0, msg.sender);

    emit ImageCreated(imageCount, _imageHash, _description, 0, msg.sender);
  }

  //Tip images
  function tipImageOwner(uint _id) public payable {
    // Make sure the id is valid
    require(_id > 0 && _id <= imageCount);
    // Fetch the image
    Image memory _image = images[_id];
    // Fetch the author
    address payable _author = _image.author;
    // Pay the author by sending them Ether
    address(_author).transfer(msg.value);
    // Increment the tip Amount
    _image.tipAmount = _image.tipAmount + msg.value;
    //update the image
    images[_id] = _image;
    // Trigger an event
    emit ImageTipped(_id, _image.hash, _image.description, _image.tipAmount, _author);
  }

}
