const cds = require("@sap/cds");

module.exports = cds.service.impl(async (srv) => {
  const serviceEvenMesh = await cds.connect.to("messaging");

  srv.on("helloWorld", async (req) => {
    const { name } = req.data;

    serviceEvenMesh.emit("default/sgonzmot.com/temp/TOPIC_EVENT_MESH_TEMP", {
      message: `Hello ${name} from Event Mesh`,
    });

    return { message: `Hello ${name}` };
  });

  serviceEvenMesh.on(
    "default/sgonzmot.com/temp/TOPIC_EVENT_MESH_TEMP",
    async (req) => {
      console.log("Mensaje recibido:", JSON.stringify(req.data, null, 2));
    }
  );
});
