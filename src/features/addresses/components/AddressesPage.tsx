"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMapMarkerAlt,
  faTrash,
  faPhone,
  faCity,
  faMailBulk,
} from "@fortawesome/free-solid-svg-icons";
import useAddresses from "../hooks/useAddresses";
import useAddAddress from "../hooks/useAddAddress";

export default function AddressesPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const { addresses, isLoading, isDeleting, deleteAddress, refreshAddresses } =
    useAddresses();
  const { register, handleSubmit, errors, isSubmitting, reset } = useAddAddress(
    () => {
      setShowAddForm(false);
      refreshAddresses();
    }
  );

  const handleDelete = (addressId: string, name: string) => {
    if (window.confirm(`Delete "${name}" address?`)) {
      deleteAddress(addressId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-neutral-900">Addresses</h2>
          <p className="text-sm text-neutral-500">
            Manage your delivery addresses
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
        >
          <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
          {showAddForm ? "Cancel" : "Add Address"}
        </button>
      </div>

      {/* Add Address Form */}
      {showAddForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-neutral-200 rounded-lg p-5 space-y-4"
        >
          <h3 className="text-sm font-semibold text-neutral-900 mb-3">
            New Address
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-neutral-700 mb-1.5"
              >
                Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                {...register("name")}
                className={`
                  w-full px-3 py-2 text-sm bg-white border rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500
                  transition-colors
                  ${errors.name ? "border-red-400" : "border-neutral-300"}
                `}
                placeholder="Home, Work, etc."
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-neutral-700 mb-1.5"
              >
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                {...register("phone")}
                className={`
                  w-full px-3 py-2 text-sm bg-white border rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500
                  transition-colors
                  ${errors.phone ? "border-red-400" : "border-neutral-300"}
                `}
                placeholder="+1 (555) 000-0000"
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* City */}
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-neutral-700 mb-1.5"
              >
                City <span className="text-red-500">*</span>
              </label>
              <input
                id="city"
                type="text"
                {...register("city")}
                className={`
                  w-full px-3 py-2 text-sm bg-white border rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500
                  transition-colors
                  ${errors.city ? "border-red-400" : "border-neutral-300"}
                `}
                placeholder="New York"
              />
              {errors.city && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.city.message}
                </p>
              )}
            </div>

            {/* Postal Code */}
            <div>
              <label
                htmlFor="postalCode"
                className="block text-sm font-medium text-neutral-700 mb-1.5"
              >
                Postal Code{" "}
                <span className="text-neutral-400 font-normal">(optional)</span>
              </label>
              <input
                id="postalCode"
                type="text"
                {...register("postalCode")}
                className={`
                  w-full px-3 py-2 text-sm bg-white border rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500
                  transition-colors
                  ${errors.postalCode ? "border-red-400" : "border-neutral-300"}
                `}
                placeholder="10001"
              />
              {errors.postalCode && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.postalCode.message}
                </p>
              )}
            </div>
          </div>

          {/* Details */}
          <div>
            <label
              htmlFor="details"
              className="block text-sm font-medium text-neutral-700 mb-1.5"
            >
              Street Address <span className="text-red-500">*</span>
            </label>
            <textarea
              id="details"
              {...register("details")}
              rows={3}
              className={`
                w-full px-3 py-2 text-sm bg-white border rounded-lg
                focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500
                transition-colors resize-none
                ${errors.details ? "border-red-400" : "border-neutral-300"}
              `}
              placeholder="123 Main Street, Apt 4B"
            />
            {errors.details && (
              <p className="mt-1 text-xs text-red-500">
                {errors.details.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="
                px-4 py-2 text-sm font-medium rounded-lg transition-all
                bg-emerald-600 text-white hover:bg-emerald-700
                disabled:opacity-50 disabled:cursor-not-allowed
                focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:ring-offset-2
              "
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Adding...
                </span>
              ) : (
                "Add Address"
              )}
            </button>
          </div>
        </form>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="bg-neutral-100 rounded-lg h-40 animate-pulse"
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && addresses.length === 0 && (
        <div className="text-center py-12 bg-white border border-neutral-200 rounded-lg">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-neutral-100 flex items-center justify-center">
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              className="w-5 h-5 text-neutral-400"
            />
          </div>
          <p className="text-sm font-medium text-neutral-900 mb-1">
            No addresses yet
          </p>
          <p className="text-xs text-neutral-500">
            Add your first delivery address
          </p>
        </div>
      )}

      {/* Address List */}
      {!isLoading && addresses.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <div
              key={address._id}
              className="bg-white border border-neutral-200 rounded-lg p-4 hover:border-neutral-300 transition-colors"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      className="w-4 h-4 text-emerald-600"
                    />
                  </div>
                  <h3 className="text-sm font-semibold text-neutral-900">
                    {address.name}
                  </h3>
                </div>
                <button
                  onClick={() => handleDelete(address._id, address.name)}
                  disabled={isDeleting === address._id}
                  className="text-neutral-400 hover:text-red-600 transition-colors disabled:opacity-50"
                >
                  <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
                </button>
              </div>

              {/* Details */}
              <div className="space-y-2">
                <p className="text-sm text-neutral-600">{address.details}</p>
                <div className="flex flex-col gap-1.5 text-xs text-neutral-500">
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faCity} className="w-3 h-3" />
                    <span>
                      {address.city}
                      {address.postalCode && `, ${address.postalCode}`}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faPhone} className="w-3 h-3" />
                    <span>{address.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
