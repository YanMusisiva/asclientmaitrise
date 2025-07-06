export function getEmailContent(elementName: string) {
  switch (elementName) {
    case "Formation Next.js Pro":
      return {
        subject: "Merci pour votre intérêt pour la Formation Next.js Pro",
        html: 
          `<div>
            <h2>Formation Next.js Pro</h2>
            <p>Merci pour votre intérêt pour notre formation avancée sur Next.js. Nous reviendrons vers vous rapidement.</p>
          </div>`
        ,
      };
    case "Audit SEO Gratuit":
      return {
        subject: "Votre audit SEO gratuit est en préparation",
        html: 
          `<div style="max-width: 480px; margin: auto; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px; font-family: Arial, sans-serif; color: #333333; padding: 24px;">
  <div style="text-align: center; margin-bottom: 20px;">
    <img src="https://www.paypalobjects.com/webstatic/icon/pp258.png" alt="Logo" width="64" style="margin-bottom: 12px;" />
    <h2 style="font-size: 20px; color: #003087; margin: 0;">Audit SEO Gratuit</h2>
  </div>
  <p style="font-size: 16px; line-height: 1.5; margin-bottom: 24px;">
    Merci d'avoir demandé un audit SEO gratuit. Nous préparons votre rapport et nous vous le transmettrons sous peu.
  </p>
  <div style="text-align: center;">
    <a href="https://www.youtube.com/watch?v=votre_video_id" target="_blank" style="background-color: #0070ba; color: #ffffff; text-decoration: none; padding: 12px 20px; border-radius: 4px; font-size: 16px; display: inline-block;">
      Voir la vidéo explicative
    </a>
  </div>
</div>`
        ,
      };
    case "Consultation Gratuite":
      return {
        subject: "Confirmation de votre demande de consultation gratuite",
        html: 
          `<div>
            <h2>Consultation Gratuite</h2>
            <p>Merci d'avoir réservé une consultation gratuite. Nous prendrons contact rapidement pour fixer un créneau.</p>
          </div>`
        ,
      };
    default:
      return {
        subject: `Merci pour votre intérêt pour ${elementName}`,
        html: 
          `<div>
            <h2>${elementName}</h2>
            <p>Merci pour votre intérêt. Nous reviendrons rapidement vers vous avec plus d'informations.</p>
          </div>`
        ,
      };
  }
}




