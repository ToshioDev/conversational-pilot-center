import React from "react";

const Sandbox = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Sandbox de Pruebas IA</h1>
      <iframe
        src="https://rc-n8n.pulse.lat/webhook/2bcfb580-5b0c-4acd-adfa-d37a600ff3c2/chat"
        title="Chat IA"
        className="w-full h-[600px] border rounded-md"
      />
    </div>
  );
};

export default Sandbox;
