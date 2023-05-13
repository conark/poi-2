import { db } from "../models/db.js";

export const donationsController = {
  index: {
    handler: async function (request, h) {
      const candidates = await db.candidateStore.getAllCandidates();
      return h.view("Donate", { title: "Make a Donation", candidates: candidates });
    },
  },
  report: {
    handler: async function (request, h) {
      const donations = await db.donationStore.getAllDonations();
      let total = 0;
      donations.forEach((donation) => {
        total += donation.amount;
      });
      return h.view("Report", {
        title: "Donations to Date",
        donations: donations,
        total: total,
      });
    },
  },
  donate: {
    handler: async function (request, h) {
      try {
        const loggedInUser = request.auth.credentials;
        const rawCandidate = request.payload.candidate.split(",");
        const candidate = await db.candidateStore.findByName(rawCandidate[0], rawCandidate[1]);
        await db.donationStore.donate(request.payload.amount, request.payload.method, loggedInUser._id, candidate._id);
        return h.redirect("/report");
      } catch (err) {
        return h.view("main", { errors: [{ message: err.message }] });
      }
    },
  },
};
