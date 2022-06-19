export function sendInfo(playerNum, dropBlocks, deadBlocks) {
  const playStatus = [dropBlocks, deadBlocks];
  const statusJson = JSON.stringify(playStatus);
  //   console.log(statusJson);
  fetch(`server/collectPlayerStatus.php?player=1&status=${statusJson}`).then((res) => {
      
    return res.json();
  });
}
