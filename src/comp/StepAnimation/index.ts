/*
class BaseLine {
  scene: DATA_COLUMN_STACKS;
  finalScene: DATA_COLUMN_STACKS;

  width: number;
  height: number;
  svg = d3.select("#" + SATOSHI_ART_BOARD);

  COLUMN_WIDTH: number;
  HALF_COLUMN_WIDTH: number;

  constructor({ scene, width, height, finalScene }: DRAW_SCENE_PARAMS) {
    this.scene = scene;
    this.width = width;
    this.height = height;
    this.finalScene = finalScene;

    const svg = d3
      .select("#" + SATOSHI_ART_BOARD)
      .attr("width", width)
      .attr("height", height);

    // need to check how many columns are in the scene so

    // loop through finalScene & check how many keys have a length greater than 0

    const columns = Object.keys(this.finalScene).reduce((acc, key: string) => {
      return finalScene[key].length > 0 ? acc + 1 : acc;
    }, 0);
    console.log(columns);
    this.COLUMN_WIDTH = columns > 1 ? width / 4 : width;
    this.HALF_COLUMN_WIDTH = this.COLUMN_WIDTH / 2;

    this.startScene();
  }
}
*/
